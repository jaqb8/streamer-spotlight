import { Platform } from '../streamers.model';

export class CreateStreamerDto {
  name: string;
  description: string;
  platform: Platform;
}
