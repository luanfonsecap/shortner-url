import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './services/favorites.service';
import { ShortenSchema } from '../shorten/schemas/shorten.schema';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: process.env.REDIS_URL,
    }),
    MongooseModule.forFeature([{ name: 'Shorten', schema: ShortenSchema }]),
  ],
  providers: [FavoritesService],
  controllers: [FavoritesController],
  exports: [FavoritesService],
})
export class FavoritesModule {}
