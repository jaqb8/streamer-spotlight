import { IsEnum, IsNotEmpty } from 'class-validator';
import { StreamingPlatform } from '../streaming-platform.enum';

export class CreateStreamerDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsEnum(StreamingPlatform)
  platform: StreamingPlatform;
}
