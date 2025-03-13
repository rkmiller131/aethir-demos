import { endGameSession } from '@/app/lib/gameState';

/**
 * Special API route to handle the end game beacon request
 * This comes from a beforeunload event in the client, when
 * the user closes the tab or refreshes the page
*/
export async function POST() {
  await endGameSession();
  return new Response(null, { status: 204 });
}