// Game state management with Redis instance
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { redis } from "./redis";
import {
  GameAvailability,
  GameContainer,
  GameUrlResult,
  SessionResult
} from "./types";
import {
  TOTAL_CONTAINERS,
  REDIS_KEYS,
  SESSION_COOKIE_NAME,
  SESSION_TIMEOUT_MS,
} from "./constants";

/**
 * Initializes the game state in Redis
 * Called when the application starts up
*/
export async function initializeGameState(): Promise<void> {
  console.log("Initializing game state...");

  // First check existing user sessions
  const userSessions = await redis.hgetall(REDIS_KEYS.USER_SESSIONS) || {};
  const activeSessionCount = Object.keys(userSessions).length;
  console.log(`Found ${activeSessionCount} active user sessions`);

  // Check to see if we have any containers in Redis.
  const containers = await redis.hgetall(REDIS_KEYS.CLIENT_CONTAINERS) || {};
  const existingContainerIds = Object.keys(containers);
  console.log(`Found ${existingContainerIds.length} existing containers`);

  // Iterate over the total container count and pull the game streaming url from env
  for (let i = 0; i < TOTAL_CONTAINERS; i++) {
    const containerUrl = process.env[`GAME_STREAMING_URL_${i}`];
    if (!containerUrl) {
      throw new Error(`Missing environment variable for GAME_STREAMING_URL_${i}, or incorrect total container const`);
    }

    // Check if we have an existing container for this index
    if (i < existingContainerIds.length) {
      const existingContainerId = existingContainerIds[i];
      // Get that container's data
      const containerData = await redis.hget(REDIS_KEYS.CLIENT_CONTAINERS, existingContainerId) as GameContainer;
      if (containerData) {
        try {
          // Update URL if it changed
          if (containerData.url !== containerUrl) {
            console.log(`Updating URL for container ${existingContainerId}`);
            containerData.url = containerUrl;

            // Update in Redis
            const containerHashEntry = { [existingContainerId]: JSON.stringify(containerData) };
            await redis.hset(REDIS_KEYS.CLIENT_CONTAINERS, containerHashEntry);
          }
        } catch (error) {
          console.error(`Error parsing container data for ${existingContainerId}:`, error);
        }
      } else {
        console.error(`Invalid container data for ${existingContainerId}, removing it from Redis`);
        await redis.hdel(REDIS_KEYS.CLIENT_CONTAINERS, existingContainerId);
      }
      // Otherwise make a fresh container reference for this game client
    } else {
      const containerId = uuidv4();
      const newContainer: GameContainer = {
        id: containerId,
        url: containerUrl,
      }
      const containerHashEntry = { [containerId]: JSON.stringify(newContainer) };
      await redis.hset(REDIS_KEYS.CLIENT_CONTAINERS, containerHashEntry);
    }

  }
  // Check if there are any active containers, if not this will initialize the set
  const activeContainerIds = await redis.smembers(REDIS_KEYS.ACTIVE_CONTAINER_IDS) || [];
  // If the set doesn't exist or is empty, that's fine - it starts as an empty set
  console.log(`Active container set initialized with ${activeContainerIds.length} containers`);
}

/**
 * Checks for game sessions that have gone over the alloted demo time (SESSION_TIMEOUT_MS)
*/
async function checkAndResetInactiveSessions(): Promise<void> {
  // Get a list of active containers
  const activeContainerIds = await redis.smembers(REDIS_KEYS.ACTIVE_CONTAINER_IDS) || [];

  for (const containerId of activeContainerIds) {
    // Check if the container is still valid
    const containerData = await redis.hget(REDIS_KEYS.CLIENT_CONTAINERS, containerId) as GameContainer;
    if (!containerData) {
      console.log(`Removing invalid container ID: ${containerId}`);
      await redis.srem(REDIS_KEYS.ACTIVE_CONTAINER_IDS, containerId);
      continue; // skip to next container
    }

    const now = Date.now();
    const containerTimestamp = Number(containerData.lastSessionStart);

    // Check the container's lastSessionStart timestamp to see if it has exceeded the timeout
    if (now - containerTimestamp > SESSION_TIMEOUT_MS) {
      console.log(`Container ID ${containerId} has exceeded the timeout, removing it`);
      await redis.srem(REDIS_KEYS.ACTIVE_CONTAINER_IDS, containerId);

      // Also remove from user session hash map
      const userSessions = await redis.hgetall(REDIS_KEYS.USER_SESSIONS);
      if (userSessions) {
        for (const [sessionId, containerIdForSession] of Object.entries(userSessions)) {
          if (containerIdForSession === containerId) {
            await redis.hdel(REDIS_KEYS.USER_SESSIONS, sessionId);
          }
        }
      }
    }
  }
}

/**
 * Attempts to start a new game session
 * Modifies active containers and starts a new user session with that container
*/
export async function startGameSession(): Promise<SessionResult> {
  await checkAndResetInactiveSessions();

  try {
    const activeContainerIds = await redis.smembers(REDIS_KEYS.ACTIVE_CONTAINER_IDS) || [];
    // if the active container ids length are less than the total containers, we can create a new session
    if (activeContainerIds.length < TOTAL_CONTAINERS) {
      console.log("A container is available, creating new session");
      const newSessionId = uuidv4();
      const currentTime = Date.now();

    // Store the session ID in a cookie so the client can prove ownership
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, newSessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: SESSION_TIMEOUT_MS / 1000
    });

    // get all the client containers from redis
    // FOR NOW, ONLY ONE PERSON PER CONTAINER
    // so we can just use the first available container
    const clientContainers = await redis.hgetall(REDIS_KEYS.CLIENT_CONTAINERS) || {};
    const nextAvailableContainerId = Object.keys(clientContainers).find(clientContainerId => {
      if (!activeContainerIds.includes(clientContainerId)) {
        return clientContainerId;
      }
    });
    if (!nextAvailableContainerId) {
      return { success: false, message: "No available game client containers" };
    }
    await redis.sadd(REDIS_KEYS.ACTIVE_CONTAINER_IDS, nextAvailableContainerId);
    // Update the user session with this container id
    const userSessionHashEntry = { [newSessionId]: nextAvailableContainerId };
    await redis.hset(REDIS_KEYS.USER_SESSIONS, userSessionHashEntry);

    // update the next avilable container created at time with the current time
    const containerData = await redis.hget(REDIS_KEYS.CLIENT_CONTAINERS, nextAvailableContainerId) as GameContainer;
    if (containerData) {
      try {
        containerData.lastSessionStart = currentTime;
        const containerHashEntry = { [nextAvailableContainerId]: JSON.stringify(containerData) };
        await redis.hset(REDIS_KEYS.CLIENT_CONTAINERS, containerHashEntry);
      } catch (error) {
        console.error(`Error parsing container data for ${nextAvailableContainerId}:`, error);
      }
    }
    // otherwise all games are in progress.
    } else {
      return { success: false, message: "No available game client containers" };
    }

    return { success: true, message: "Session started successfully" };
  } catch (error) {
    console.error("Error starting game session:", error);
    return { success: false, message: "Failed to start game session" };
  }
}

/**
 * Ends the current game session
 * @returns Object indicating if the session was ended successfully
*/
export async function endGameSession(): Promise<SessionResult> {
  const sessionCookie = (await cookies()).get(SESSION_COOKIE_NAME);

  if (!sessionCookie) {
    return { success: false, message: "No session cookie found" };
  }

  const userSessionContainerId = await redis.hget(REDIS_KEYS.USER_SESSIONS, sessionCookie.value);

  if (!userSessionContainerId) {
    (await cookies()).set(SESSION_COOKIE_NAME, "", { maxAge: 0 });
    return { success: false, message: "Invalid session" };
  }

  // Reset the game state with a transaction:
  // release the container from active id list, delete the session mapping
  const tx = redis.pipeline();
  tx.srem(REDIS_KEYS.ACTIVE_CONTAINER_IDS, userSessionContainerId);
  tx.hdel(REDIS_KEYS.USER_SESSIONS, sessionCookie.value);
  await tx.exec();
  console.log(`Session ${sessionCookie.value} ended, container ${userSessionContainerId} removed from active list`);

  // Clear the session cookie
  (await cookies()).set(SESSION_COOKIE_NAME, "", { maxAge: 0 });

  return { success: true, message: "Session ended successfully" };
}

/**
 * Checks if the game is currently available
 * @returns Object indicating if the game is available
*/
export async function getGameAvailability(): Promise<GameAvailability> {
  await checkAndResetInactiveSessions();

  const activeContainerIds = await redis.smembers(REDIS_KEYS.ACTIVE_CONTAINER_IDS) || [];

  return {
    isAvailable: activeContainerIds.length < TOTAL_CONTAINERS,
    activeContainers: activeContainerIds.length,
    totalContainers: TOTAL_CONTAINERS
  };
}

/**
 * Get the actual game streaming URL, but only if the user has a valid session
 * This keeps the actual URL private and only exposes it to authorized users
 * @returns Object with the game URL if successful
*/
export async function getGameUrl(): Promise<GameUrlResult> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie) {
    return { success: false, message: "No session cookie found" };
  }

  // get the user sessions based on session cookie value
  const userSessionContainerId = await redis.hget(REDIS_KEYS.USER_SESSIONS, sessionCookie.value);
  if (!userSessionContainerId) {
    (await cookies()).set(SESSION_COOKIE_NAME, "", { maxAge: 0 });
    return { success: false, message: "Invalid session" };
  }

  // get the associated game client container by its id
  const containerId = userSessionContainerId.toString();
  const clientContainer = await redis.hget(REDIS_KEYS.CLIENT_CONTAINERS, containerId) as GameContainer;

  if (clientContainer) {
    return {
      success: true,
      url: clientContainer.url,
      containerId: containerId
    }
  } else {
    (await cookies()).set(SESSION_COOKIE_NAME, "", { maxAge: 0 });
    return { success: false, message: "Invalid container ID" };
  }
}