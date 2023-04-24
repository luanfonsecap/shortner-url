import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './services/favorites.service';
import { ShortenSchema } from '../shorten/schemas/shorten.schema';

@Module({
  controllers: [FavoritesController],
  imports: [
    MongooseModule.forFeature([{ name: 'Shorten', schema: ShortenSchema }]),
  ],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
