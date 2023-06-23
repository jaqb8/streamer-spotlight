import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StreamersService } from './streamers.service';
import { Platform, Streamer } from './streamers.model';
import { CreateStreamerDto } from './dto/create-streamer.dto';

@Controller('streamers')
export class StreamersController {
  constructor(private streamersService: StreamersService) {}

  @Get()
  getAllStreamers(): Streamer[] {
    return this.streamersService.getAllStreamers();
  }

  @Get('/:id')
  getStreamerById(@Param('id') id: string): Streamer {
    return this.streamersService.getStreamerById(id);
  }

  @Post()
  createStreamer(@Body() createStreamerDto: CreateStreamerDto): Streamer {
    return this.streamersService.createStreamer(createStreamerDto);
  }
}
