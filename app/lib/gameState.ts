// Game state management with Redis instance on Upstash
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { redis } from "./redis";
import {
  ActiveSessions,
  GameUrlResult,
  SessionResult,
  SessionValidityResult
} from "./types";
import {
  GAME_STREAMING_URL,
  REDIS_KEYS,
  SESSION_COOKIE_NAME,
  SESSION_TIMEOUT_MS,
} from "./constants";

/**
 * Called when the application starts up
 * Just logs information about how many current active sessions there are
*/
export async function initializeGameState(): Promise<void> {
  const activeSessions = await redis.hgetall(REDIS_KEYS.ACTIVE_SESSIONS) || [];
  console.log("Current number of active sessions:", Object.keys(activeSessions).length);
}

/**
 * Checks for session timeouts and resets them if needed
 * Each user session gets 30 minutes since their joined at timestamp
*/
async function checkAndTimeoutSessions(): Promise<void> {
  const activeSessions = await redis.hgetall(REDIS_KEYS.ACTIVE_SESSIONS) || {} as ActiveSessions;
  const currentTime = Date.now();
  const inactiveThreshold = currentTime - SESSION_TIMEOUT_MS;

  for (const [sessionId, timestamp] of Object.entries(activeSessions)) {
    if (Number(timestamp) < inactiveThreshold) {
      console.log(`Session ${sessionId} has expired, kicking...`);
      await endGameSession();
    }
  }
}

/**
 * Attempts to start a new game session
 * No max concurrent user restriction; just creates a new session and adds it to active list
 * @returns Object indicating if the session was started successfully
*/
export async function startGameSession(): Promise<SessionResult> {
  await checkAndTimeoutSessions();

  try {
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

    const activeSessionHashEntry = { [newSessionId]: currentTime.toString() };
    await redis.hset(REDIS_KEYS.ACTIVE_SESSIONS, activeSessionHashEntry);

    return { success: true, message: "Session started successfully" };
  } catch (error) {
    console.error("Error starting game session:", error);
    return { success: false, message: "Failed to start game session" };
  }
}

/**
 * Ends the current user's game session
 * @returns Object indicating if the session was ended successfully
*/
export async function endGameSession(): Promise<SessionResult> {
  try {
    const sessionCookie = (await cookies()).get(SESSION_COOKIE_NAME);

    if (!sessionCookie) {
      return { success: false, message: "No session cookie found" };
    }

    const currentUserSession = await redis.hget(REDIS_KEYS.ACTIVE_SESSIONS, sessionCookie.value);

    if (!currentUserSession) {
      (await cookies()).set(SESSION_COOKIE_NAME, "", { maxAge: 0 });
      return { success: false, message: "Invalid session" };
    }

    // Remove the session from Redis and clear the cookie
    await redis.hdel(REDIS_KEYS.ACTIVE_SESSIONS, sessionCookie.value);
    (await cookies()).set(SESSION_COOKIE_NAME, "", { maxAge: 0 });

    return { success: true, message: "Session ended successfully" };
  } catch (error) {
    console.error("Error ending game session:", error);
    return { success: false, message: "Failed to end game session" };
  }
}

/**
 * Ends all active game sessions
 * This will force all players out of the game (due to polling for valid cookies on client side)
 * @returns Object indicating if the operation was successful
 */
export async function endAllGameSessions(): Promise<SessionResult> {
  try {
    const activeSessions = await redis.hgetall(REDIS_KEYS.ACTIVE_SESSIONS) || {};
    const sessionCount = Object.keys(activeSessions).length;

    if (sessionCount === 0) {
      return { success: true, message: "No active sessions to end" };
    }

    console.log(`Ending all ${sessionCount} active sessions`);
    // Deletes the entire redis hash
    await redis.del(REDIS_KEYS.ACTIVE_SESSIONS);
    return {
      success: true,
      message: `Successfully terminated ${sessionCount} active sessions`
    };
  } catch (error) {
    console.error("Error ending all game sessions:", error);
    return { success: false, message: "Failed to end all game sessions" };
  }
}

//-------------------------------------------------------------------------
// UPDATE: GAME IS NOW "Always Available" - REMOVING CHECK ----------------
//-------------------------------------------------------------------------
// /**
//  * Checks if the game is currently available
//  * @returns Object indicating if the game is available
// */
// export async function getGameAvailability(): Promise<GameAvailability> {
//   await checkAndTimeoutSessions();
//   const isPlaying = await redis.get(REDIS_KEYS.IS_PLAYING);

//   // Game is available if no one is playing
//   return { isAvailable: isPlaying !== SOMEONE_PLAYING };
// }

export async function getSessionValidity(): Promise<SessionValidityResult> {
  await checkAndTimeoutSessions();

  const sessionCookie = (await cookies()).get(SESSION_COOKIE_NAME);
  if (!sessionCookie) {
    return { isValid: false, message: "No session cookie found" };
  }

  const currentUserSession = await redis.hget(REDIS_KEYS.ACTIVE_SESSIONS, sessionCookie.value);
  if (!currentUserSession) {
    (await cookies()).set(SESSION_COOKIE_NAME, "", { maxAge: 0 });
    return { isValid: false, message: "Invalid session" };
  }

  return { isValid: true, message: "Session is valid" };
}

/**
 * Get the actual game streaming URL, but only if the user has a valid session
 * This keeps the actual URL private and only exposes it to authorized users
 * @returns Object with the game URL if successful
*/
export async function getGameUrl(): Promise<GameUrlResult> {
  const sessionCookie = (await cookies()).get(SESSION_COOKIE_NAME);

  if (!sessionCookie) {
    return { success: false, message: "No session cookie found" };
  }

  // Make sure the session is still valid/associated with a user
  const currentUserSession = await redis.hget(REDIS_KEYS.ACTIVE_SESSIONS, sessionCookie.value);
  if (!currentUserSession) {
    (await cookies()).set(SESSION_COOKIE_NAME, "", { maxAge: 0 });
    return { success: false, message: "Invalid session" };
  }

  // Return the actual game streaming URL (can support up to 8 concurrent users at time of GDC 2025)
  return {
    success: true,
    url: GAME_STREAMING_URL
  };
}