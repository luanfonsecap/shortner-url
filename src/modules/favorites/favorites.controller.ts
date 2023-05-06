import {
  CacheTTL,
  Controller,
  Get,
  Logger,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';

import { FavoritesService } from './services/favorites.service';
@Controller('favorites')
export class FavoritesController {
  private readonly logger = new Logger(FavoritesController.name);

  constructor(private readonly favoritesService: FavoritesService) {}

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 60 * 24) // 24 hours
  @Get('')
  async recoverTopFavorites() {
    this.logger.log(`Recovering top ten favorites`);

    const favorites = await this.favoritesService.recoverTop();

    return favorites;
  }
}
