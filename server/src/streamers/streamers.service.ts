import { Injectable } from '@nestjs/common';
import { Platform, Streamer } from './streamers.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateStreamerDto } from './dto/create-streamer.dto';

@Injectable()
export class StreamersService {
  private streamers: Streamer[] = [];

  getAllStreamers(): Streamer[] {
    return this.streamers;
  }

  getStreamerById(id: string): Streamer {
    return this.streamers.find((streamer) => streamer.id === id);
  }

  createStreamer(createStreamerDto: CreateStreamerDto): Streamer {
    const { name, description, platform } = createStreamerDto;

    const streamer: Streamer = {
      id: uuidv4(),
      name,
      description,
      platform,
    };
    this.streamers.push(streamer);
    return streamer;
  }
}
