export type GameAvailability = {
  isAvailable: boolean;
};

export type SessionResult = {
  success: boolean;
  message?: string;
};

export type GameUrlResult = SessionResult & {
  /**
   * The URL to the game streaming service (only present if success is true)
  */
  url?: string;
};