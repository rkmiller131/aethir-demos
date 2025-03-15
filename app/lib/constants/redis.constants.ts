/**
 * Redis key constants
 * https://redis.io/docs/latest/develop/use/keyspace/
 */
export const REDIS_KEYS = {
  /**
   * Stores an array of all possible client container urls
  */
  CLIENT_CONTAINERS: "game:client_containers",

  /**
   * Currently only one container per player, but option to feed multiple
   * controllers to a single container for "multiplayer" even remotely.
   * Stores an array of containers currently in use.
  */
  ACTIVE_CONTAINER_IDS: "game:active_container_ids",

  /**
   * Session mapping;
   * Hash mapping session IDs to container IDs
  */
  USER_SESSIONS: "game:user_sessions",
};
