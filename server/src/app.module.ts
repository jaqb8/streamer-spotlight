import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StreamersModule } from './streamers/streamers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Streamer } from './streamers/streamer.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/streamers',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Streamer, User],
    }),
    StreamersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
