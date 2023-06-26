import { Module } from '@nestjs/common';
import { StreamersController } from './streamers.controller';
import { StreamersService } from './streamers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Streamer } from './streamer.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Streamer]), AuthModule],
  controllers: [StreamersController],
  providers: [StreamersService],
})
export class StreamersModule {}
