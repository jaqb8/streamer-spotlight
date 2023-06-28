import { Platform } from "../types";
import TwitchIcon from "../img/twitch.svg";
import YoutubeIcon from "../img/youtube.svg";
import TiktokIcon from "../img/tiktok.svg";
import KickIcon from "../img/kick.png";
import RumbleIcon from "../img/rumble2.png";

export const platforms = {
  [Platform.TWITCH]: {
    label: "Twitch",
    img: TwitchIcon,
    value: Platform.TWITCH,
  },
  [Platform.YOUTUBE]: {
    label: "Youtube",
    img: YoutubeIcon,
    value: Platform.YOUTUBE,
  },
  [Platform.TIKTOK]: {
    label: "TikTok",
    img: TiktokIcon,
    value: Platform.TIKTOK,
  },
  [Platform.KICK]: {
    label: "Kick",
    img: KickIcon,
    value: Platform.KICK,
  },
  [Platform.RUMBLE]: {
    label: "Rumble",
    img: RumbleIcon,
    value: Platform.RUMBLE,
  },
};
