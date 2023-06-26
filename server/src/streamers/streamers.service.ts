import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStreamerDto } from './dto/create-streamer.dto';
import { VoteStreamerDto, VoteType } from './dto/vote-streamer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Streamer } from './streamer.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from 'src/auth/user.entity';

@Injectable()
export class StreamersService {
  constructor(
    @InjectRepository(Streamer)
    private streamersRepository: Repository<Streamer>,
  ) {}

  async getStreamers(): Promise<Streamer[]> {
    return await this.streamersRepository.find();
  }

  async getStreamerById(id: string): Promise<Streamer> {
    const streamer = await this.streamersRepository.findOne({
      where: { id },
    });

    if (!streamer) {
      throw new NotFoundException(`Streamer with ID "${id}" not found`);
    }
    return streamer;
  }

  async createStreamer(
    createStreamerDto: CreateStreamerDto,
    user: User,
  ): Promise<Streamer> {
    const { name, description, platform } = createStreamerDto;

    const streamer = this.streamersRepository.create({
      id: uuid(),
      name,
      description,
      platform,
      likes: [],
      dislikes: [],
      user,
    });

    return await this.streamersRepository.save(streamer);
  }

  async voteStreamer(
    id: string,
    type: VoteType,
    user: User,
  ): Promise<Streamer> {
    const streamer = await this.getStreamerById(id);
    if (type === VoteType.LIKE) {
      streamer.likes.unshift(user.id);
    } else if (type === VoteType.DISLIKE) {
      streamer.dislikes.unshift(user.id);
    }
    return await this.streamersRepository.save(streamer);
  }
}
