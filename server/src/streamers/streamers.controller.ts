import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { StreamersService } from './streamers.service';
import { CreateStreamerDto } from './dto/create-streamer.dto';
import { VoteStreamerDto } from './dto/vote-streamer.dto';
import { Streamer } from './streamer.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

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
  @UseGuards(AuthGuard())
  createStreamer(
    @Body() createStreamerDto: CreateStreamerDto,
    @GetUser() user: User,
  ): Promise<Streamer> {
    return this.streamersService.createStreamer(createStreamerDto, user);
  }

  @Put('/:id/vote')
  @UseGuards(AuthGuard())
  voteStreamer(
    @Param('id') id: string,
    @Body() voteStreamerDto: VoteStreamerDto,
    @GetUser() user: User,
  ): Promise<Streamer> {
    const { type } = voteStreamerDto;
    return this.streamersService.voteStreamer(id, type, user);
  }
}
