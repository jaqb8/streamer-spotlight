export type Streamer = {
  id: string;
  name: string;
  description: string;
  platform: Platform;
  likes: string[];
  dislikes: string[];
};

export enum Platform {
  TWITCH = "twitch",
  YOUTUBE = "youtube",
  TIKTOK = "tiktok",
  KICK = "kick",
  RUMBLE = "rumble",
}

export enum VoteType {
  LIKE = "like",
  DISLIKE = "dislike",
}

export type User = {
  id: string;
  username: string;
};
