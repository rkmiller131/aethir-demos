'use server';

import { redirect } from 'next/navigation';
import {
  getSessionValidity,
  startGameSession,
  endGameSession,
  getGameUrl,
  initializeGameState,
  endAllGameSessions,
} from '@/app/lib/gameState';
import { cookies } from 'next/headers';
import { APP_PAGES } from './lib/constants';
import { AppPageType, StreamProviderType } from './lib/types';

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
export async function startGame(page: AppPageType) {
  const result = await startGameSession();

  if (result.success) {
    if (page === APP_PAGES.LANDING) {
      redirect('/play/0');
    } else if (page === APP_PAGES.NETFLIX) {
      redirect('/play/1');
    } else if (page === APP_PAGES.GAMEPASS) {
      redirect('/play/2');
    } else if (page === APP_PAGES.LUNA) {
      redirect('/play/3');
    }
  }

  return result;
}

/**
 * Server action to end a game session
 * Called when the player hits the back button on the play page.
 */
export async function endGame(page: AppPageType) {
  await endGameSession();
  redirect(page);
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
export async function getGameStreamUrl(provider?: StreamProviderType) {
  return getGameUrl(provider);
}

/**
 * Simple plain text password check
 */
export async function checkPassword(password: string) {
  const netflixPassword = process.env.NETFLIX_PASSWORD;
  const landingPassword = process.env.LANDING_PASSWORD;
  const gamepassPassword = process.env.GAMEPASS_PASSWORD;
  const lunaPassword = process.env.LUNA_PASSWORD;

  if (
    password === netflixPassword ||
    password === landingPassword ||
    password === gamepassPassword ||
    password === lunaPassword
  ) {
    const page =
      password === netflixPassword
        ? APP_PAGES.NETFLIX
        : password === landingPassword
        ? APP_PAGES.LANDING
        : password === gamepassPassword
        ? APP_PAGES.GAMEPASS
        : APP_PAGES.LUNA;
    // Set a cookie to maintain the authenticated session
    (await cookies()).set('auth', 'true', {
      httpOnly: true,
      // https://www.wisp.blog/blog/why-your-nextjs-15-cookies-work-locally-but-break-in-production-and-how-to-fix-it
      // secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour
      path: page,
    });

    return { success: true, page: page };
  }

  return { success: false };
}
