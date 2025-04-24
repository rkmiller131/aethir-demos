/**
 * Session timeout in milliseconds (30 minutes)
*/
export const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

/**
 * Cookie name for storing game session ID
*/
export const SESSION_COOKIE_NAME = "game_session";

/**
 * URL to the Aethir stream, kept private on the server
*/
export const GAME_URL = process.env.STREAM_PROVIDER === "Aethir" ? process.env.AETHIR_URL as string : process.env.GAMELIFT_URL as string;