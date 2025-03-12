/**
 * Redis key constants
 * These are the keys we use to store game state in Redis
 */
export const REDIS_KEYS = {
  /**
   * Stores whether someone is currently playing (value: "0" or "1")
  */
  IS_PLAYING: "game:is_playing", // "game:" is a prefix naming convention to namespace the keys

  /**
   * Stores the current session ID for the active player (value: UUID string)
  */
  SESSION_ID: "game:session_id",

  /**
   * Stores the timestamp of the last activity from the player (value: timestamp number)
  */
  LAST_ACTIVITY: "game:last_activity",
};

export const SOMEONE_PLAYING = 1;
export const NO_ONE_PLAYING = 0;