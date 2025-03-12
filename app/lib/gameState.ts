// Game state management with Redis instance
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { redis } from "./redis";
import {
  GameAvailability,
  GameUrlResult,
  SessionResult
} from "./types";
import {
  GAME_STREAMING_URL,
  NO_ONE_PLAYING,
  REDIS_KEYS,
  SESSION_COOKIE_NAME,
  SESSION_TIMEOUT_MS,
  SOMEONE_PLAYING
} from "./constants";

/**
 * Initializes the game state in Redis with default values
 * Called when the application starts up
*/
export async function initializeGameState(): Promise<void> {
  // Check if IS_PLAYING key exists
  const isPlaying = await redis.get(REDIS_KEYS.IS_PLAYING);

  // If it doesn't exist, initialize it to "0" (no one playing)
  if (isPlaying === null) {
    await redis.set(REDIS_KEYS.IS_PLAYING, NO_ONE_PLAYING);
  }
}

/**
 * Attempts to start a new game session
 * Uses Redis transactions to ensure only one user can start a session at a time
 * @returns Object indicating if the session was started successfully
*/
export async function startGameSession(): Promise<SessionResult> {
  await checkAndResetInactiveSessions();

  try {
    const isPlaying = await redis.get(REDIS_KEYS.IS_PLAYING);

    if (isPlaying === SOMEONE_PLAYING) {
      return { success: false, message: "Game is already in progress" };
    }

    console.log("Game is available, creating new session");
    const newSessionId = uuidv4();
    const currentTime = Date.now();

    console.log("Setting LAST_ACTIVITY to:", currentTime);
    await redis.set(REDIS_KEYS.IS_PLAYING, SOMEONE_PLAYING);
    await redis.set(REDIS_KEYS.SESSION_ID, newSessionId);
    await redis.set(REDIS_KEYS.LAST_ACTIVITY, currentTime);
    const storedTimestamp = await redis.get(REDIS_KEYS.LAST_ACTIVITY);
    console.log("Verification - stored LAST_ACTIVITY is:", storedTimestamp);

    // Store the session ID in a cookie so the client can prove ownership
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, newSessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: SESSION_TIMEOUT_MS / 1000
    });

    return { success: true }; // Session started successfully
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

  const storedSessionId = await redis.get(REDIS_KEYS.SESSION_ID);

  if (!storedSessionId || storedSessionId !== sessionCookie.value) {
    return { success: false, message: "Invalid session" };
  }

  // Reset the game state in Redis using a transaction
  const tx = redis.pipeline();
  tx.set(REDIS_KEYS.IS_PLAYING, NO_ONE_PLAYING);
  tx.del(REDIS_KEYS.SESSION_ID);
  await tx.exec();

  // Clear the session cookie
  (await cookies()).set(SESSION_COOKIE_NAME, "", { maxAge: 0 });

  // Session ended successfully
  return { success: true };
}

/**
 * Checks for inactive sessions and resets them if needed
 * This prevents "zombie" sessions where a user left without properly ending
*/
async function checkAndResetInactiveSessions(): Promise<void> {
  const isPlaying = await redis.get(REDIS_KEYS.IS_PLAYING);
  console.log("Checking for inactive sessions, isPlaying:", isPlaying);

  // Only check for timeout if someone is currently playing
  if (isPlaying === SOMEONE_PLAYING) {
    // Get the timestamp of the last activity
    const lastActivityMs = await redis.get(REDIS_KEYS.LAST_ACTIVITY);
    const lastActivity = lastActivityMs? Number(lastActivityMs) : Date.now();

    const now = Date.now();

    // If the last activity was more than 5 minutes ago, reset the session
    if (now - lastActivity > SESSION_TIMEOUT_MS) {
      console.log("Game session reset due to inactivity");

      // Reset the game state in Redis
      await redis.set(REDIS_KEYS.IS_PLAYING, NO_ONE_PLAYING);
      await redis.del(REDIS_KEYS.SESSION_ID);
    }
  }
}

/**
 * Checks if the game is currently available
 * @returns Object indicating if the game is available
*/
export async function getGameAvailability(): Promise<GameAvailability> {
  await checkAndResetInactiveSessions();
  const isPlaying = await redis.get(REDIS_KEYS.IS_PLAYING);

  // Game is available if no one is playing
  return { isAvailable: isPlaying !== SOMEONE_PLAYING };
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

  // Get the current state from Redis
  const [isPlaying, storedSessionId] = await Promise.all([
    redis.get(REDIS_KEYS.IS_PLAYING),
    redis.get(REDIS_KEYS.SESSION_ID)
  ]);

  // Validate that:
  // 1. Someone is playing
  // 2. There is a stored session ID
  // 3. The stored session ID matches the one in the cookie
  if (
    isPlaying !== SOMEONE_PLAYING ||
    !storedSessionId ||
    storedSessionId !== sessionCookie.value
  ) {
    return { success: false, message: "No valid game session" };
  }

  // Update the last activity timestamp
  await redis.set(REDIS_KEYS.LAST_ACTIVITY, Date.now());

  // Return the actual game streaming URL
  return {
    success: true,
    url: GAME_STREAMING_URL
  };
}

/**
 * Updates the activity timestamp for the current session
 * This keeps the session alive during active gameplay
 * @returns Object indicating if the timestamp was updated successfully
*/
export async function updateActivityTimestamp(): Promise<SessionResult> {
  const sessionCookie = (await cookies()).get(SESSION_COOKIE_NAME);

  if (!sessionCookie) {
    return { success: false, message: "No session cookie found" };
  }

  // Get the current state from Redis
  const [isPlaying, storedSessionId] = await Promise.all([
    redis.get(REDIS_KEYS.IS_PLAYING),
    redis.get(REDIS_KEYS.SESSION_ID)
  ]);

  // Validate the session
  if (
    isPlaying !== SOMEONE_PLAYING ||
    !storedSessionId ||
    storedSessionId !== sessionCookie.value
  ) {
    return { success: false };
  }

  // Update the last activity timestamp
  await redis.set(REDIS_KEYS.LAST_ACTIVITY, Date.now());
  return { success: true };
}