import { Controller, Get, Logger } from '@nestjs/common';
import { FavoritesService } from './services/favorites.service';

@Controller('favorites')
export class FavoritesController {
  private readonly logger = new Logger(FavoritesController.name);

  constructor(private readonly favoritesService: FavoritesService) {}

  @Get('')
  async recoverTopFavorites() {
    this.logger.log(`Recovering top ten favorites`);

    const favorites = await this.favoritesService.recoverTop();

    return favorites;
  }
}
