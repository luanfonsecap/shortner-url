import { Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { ShortenService } from './services/shorten.service';

@Controller('shorten')
export class ShortenController {
  private readonly logger = new Logger(ShortenService.name);

  constructor(private readonly shortenService: ShortenService) {}

  @Post('create')
  async createCustomShortenedURL(
    @Query('url') url: string,
    @Query('alias') alias: string,
  ) {
    if (alias) {
      this.logger.log(`Creating shortened URL with custom alias: ${alias}`);
      return this.shortenService.createShortenedURLWithCustomAlias(url, alias);
    }

    this.logger.log(`Creating shortened URL: ${url}`);
    return this.shortenService.createShortenedURL(url);
  }
}
