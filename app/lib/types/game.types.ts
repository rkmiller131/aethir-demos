export interface ActiveSessions {
  [sessionId: string]: string; // sessionId mapped to timestamp
}

export interface SessionResult{
  success: boolean;
  message?: string;
};

export interface GameUrlResult extends SessionResult {
  /**
   * The URL to the game streaming service (only present if success is true)
  */
  url?: string;
};

export interface SessionValidityResult {
  isValid: boolean;
  message?: string;
}