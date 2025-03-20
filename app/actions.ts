"use server"

import { redirect } from "next/navigation";
import {
  getSessionValidity,
  startGameSession,
  endGameSession,
  getGameUrl,
  initializeGameState,
  endAllGameSessions
} from "@/app/lib/gameState";
import { cookies } from "next/headers";

// Initialize game state on app startup
initializeGameState().catch(console.error);

/**
 * Server action to check if the session is valid
 * This is polled by the play page
*/
export async function checkGameSessionValidity() {
  return getSessionValidity();
}

/**
 * Server action to start a game session
 * Redirects to the game page if successful
*/
export async function startGame(page: string) {
  const result = await startGameSession();

  if (result.success && page === "netflix") {
    redirect("/play");
  } else if (result.success && page === "landing") {
    redirect("/play/1");
  }

  return result;
}

/**
 * Server action to end a game session
 * Called when the player hits the back button on the play page.
 */
export async function endGame() {
  await endGameSession();
  redirect("/");
}

/**
 * Used to manually abort all active game sessions.
 * Does not redirect to the password screen
 */
export async function endGamesInPlace() {
  await endAllGameSessions();
}

/**
 * Server action to get the game URL
 * Called by the game page to load the iframe
*/
export async function getGameStreamUrl() {
  return getGameUrl();
}

/**
 * Simple plain text password check
*/
export async function checkPassword(password: string) {
  const netflixPassword = process.env.NETFLIX_PASSWORD;
  const landingPassword = process.env.LANDING_PASSWORD;

  if (
    password === netflixPassword ||
    password === landingPassword
  ) {
    const page = password === netflixPassword ? "/netflix" : "/landing";
    // Set a cookie to maintain the authenticated session
    (await cookies()).set("auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1 hour
      path: page,
    });

    return { success: true, page: page };
  }

  return { success: false };
}