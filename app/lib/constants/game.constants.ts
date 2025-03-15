/**
 * Session timeout in milliseconds (15 minutes)
*/
export const SESSION_TIMEOUT_MS = 15 * 60 * 1000;

/**
 * Cookie name for storing game session ID
*/
export const SESSION_COOKIE_NAME = "game_session";

/**
 * Just a hard-coded max number of reserved containers that we currently have.
*/
export const TOTAL_CONTAINERS = Number(process.env.TOTAL_CONTAINERS);