/**
 * Redis key constants
 * https://redis.io/docs/latest/develop/use/keyspace/
 */
export const REDIS_KEYS = {
  /**
   * Stores a hash map of user session Ids and their joined timestamps
   * [uuid4]: timestamp
   * @example { "123e4567-e89b-12d3-a456-426614174000": 1690000000000 }
  */
  ACTIVE_SESSIONS: "game:active_sessions",
};