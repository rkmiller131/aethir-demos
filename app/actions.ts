"use server"

import { redirect } from "next/navigation";
import {
  getGameAvailability,
  startGameSession,
  endGameSession,
  getGameUrl,
  initializeGameState
} from "@/app/lib/gameState";
import { cookies } from "next/headers";

// Initialize game state on app startup
initializeGameState().catch(console.error);

/**
 * Server action to check if the game is available
 * This is called by the PlayNowButton component
*/
export async function checkGameAvailability() {
  return getGameAvailability();
}

/**
 * Server action to start a game session
 * Redirects to the game page if successful
*/
export async function startGame() {
  const result = await startGameSession();

  if (result.success) {
    redirect("/play");
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
 * Used to manually end the game session without redirecting;
 * Does not redirect to the password screen
 */
export async function endGameInPlace() {
  await endGameSession();
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
  const correctPassword = process.env.PASSWORD;

  if (password === correctPassword) {
    // Set a cookie to maintain the authenticated session
    (await cookies()).set("auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 60, // 30 minutes
      path: "/netflix",
    });

    return { success: true };
  }

  return { success: false };
}