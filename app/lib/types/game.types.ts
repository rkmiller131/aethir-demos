export interface GameAvailability {
  isAvailable: boolean;
  activeContainers: number;
  totalContainers: number;
};

export interface SessionResult {
  success: boolean;
  message?: string;
};

export interface GameUrlResult extends SessionResult {
  /**
   * The URL to the game streaming service (only present if success is true)
  */
  url?: string;
  containerId?: string;
};

export interface GameContainer {
  id: string;
  url: string;
  lastSessionStart?: number;
}