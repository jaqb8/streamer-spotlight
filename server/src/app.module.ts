import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StreamersModule } from './streamers/streamers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Streamer } from './streamers/streamer.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod';

        return {
          ssl: isProduction,
          type: 'mongodb',
          url: configService.get('MONGO_URI'),
          synchronize: true,
          useUnifiedTopology: true,
          entities: [Streamer, User],
        };
      },
    }),
    StreamersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
