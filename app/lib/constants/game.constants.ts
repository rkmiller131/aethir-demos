/**
 * Session timeout in milliseconds (30 minutes)
*/
export const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

/**
 * Cookie name for storing game session ID
*/
export const SESSION_COOKIE_NAME = "game_session";

/**
 * Heartbeat interval in milliseconds (60 seconds)
 * How often the client should send activity updates
 */
export const HEARTBEAT_INTERVAL_MS = 60 * 1000;

/**
 * URL to the Aethir stream, kept private on the server
*/
export const GAME_STREAMING_URL = process.env.GAME_STREAMING_URL as string;