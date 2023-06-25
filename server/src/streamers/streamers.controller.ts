import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { StreamersService } from './streamers.service';
import { StreamingPlatform } from './streaming-platform.enum';
import { CreateStreamerDto } from './dto/create-streamer.dto';
import { VoteStreamerDto } from './dto/vote-streamer.dto';
import { Streamer } from './streamer.entity';

@Controller('streamers')
export class StreamersController {
  constructor(private streamersService: StreamersService) {}

  @Get()
  getAllStreamers(): Promise<Streamer[]> {
    return this.streamersService.getStreamers();
  }

  @Get('/:id')
  getStreamerById(@Param('id') id: string): Promise<Streamer> {
    return this.streamersService.getStreamerById(id);
  }

  @Post()
  createStreamer(
    @Body() createStreamerDto: CreateStreamerDto,
  ): Promise<Streamer> {
    return this.streamersService.createStreamer(createStreamerDto);
  }

  @Put('/:id/vote')
  voteStreamer(
    @Param('id') id: string,
    @Body() voteStreamerDto: VoteStreamerDto,
  ): Promise<Streamer> {
    const { type } = voteStreamerDto;
    return this.streamersService.voteStreamer(id, type);
  }
}
