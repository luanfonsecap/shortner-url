import {
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
  Response,
} from '@nestjs/common';
import { ShortenService } from './services/shorten.service';

@Controller('shorten')
export class ShortenController {
  private readonly logger = new Logger(ShortenService.name);

  constructor(private readonly shortenService: ShortenService) {}

  @Get('/:alias')
  async redirectToOriginalURL(@Response() res, @Param('alias') alias: string) {
    this.logger.log(`Redirecting to original URL for alias: ${alias}`);

    const originalURL = await this.shortenService.retrieveOriginalURL(alias);

    return res.redirect(originalURL);
  }

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
