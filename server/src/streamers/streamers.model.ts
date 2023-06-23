export interface Streamer {
  id: string;
  name: string;
  description: string;
  platform: Platform;
}

export enum Platform {
  TWITCH = 'twitch',
  YOUTUBE = 'youtube',
  TIKTOK = 'tiktok',
  KICK = 'kick',
  RUMBLE = 'rumble',
}
