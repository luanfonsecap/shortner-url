import { Model } from 'mongoose';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { differenceInMilliseconds } from 'date-fns';

import { HashService } from 'src/modules/hash/services';
import { Shorten } from '../schemas/shorten.schema';
import { AliasExistsException } from 'src/common/exceptions/aliasExists.exception';

@Injectable()
export class ShortenService {
  private readonly logger = new Logger(ShortenService.name);

  constructor(
    private readonly hashService: HashService,
    @InjectModel(Shorten.name) private readonly shortenModel: Model<Shorten>,
  ) {}

  async createShortenedURL(url: string) {
    const startTime = new Date();

    try {
      const alias = await this.createUniqueHashAlias(url);

      const shortenedURL = new this.shortenModel({
        url,
        alias,
      });

      const result = await shortenedURL.save();
      const endTime = new Date();

      return {
        alias: result.alias,
        url: result.url,
        shortened: `http://localhost:3000/r/${result.alias}`,
        statistics: {
          timeTaken: `${Math.abs(
            differenceInMilliseconds(startTime, endTime),
          )}ms`,
        },
      };
    } catch (error) {
      this.logger.error('Error creating shortened URL: ', error);

      throw new InternalServerErrorException();
    }
  }

  async createShortenedURLWithCustomAlias(url: string, customAlias: string) {
    const startTime = new Date();

    try {
      const shortenedAliasAlreadyExists = await this.shortenModel.findOne({
        alias: customAlias,
      });

      if (shortenedAliasAlreadyExists) {
        throw new AliasExistsException();
      }

      const shortenedURL = new this.shortenModel({
        url,
        alias: customAlias,
      });

      const result = await shortenedURL.save();
      const endTime = new Date();

      return {
        alias: result.alias,
        url: result.url,
        shortened: `http://localhost:3000/r/${result.alias}`,
        statistics: {
          timeTaken: `${Math.abs(
            differenceInMilliseconds(startTime, endTime),
          )}ms`,
        },
      };
    } catch (error) {
      if (error instanceof AliasExistsException) {
        throw new AliasExistsException();
      }

      this.logger.error(
        'Error creating shortened URL with custom alias: ',
        error,
      );

      throw new InternalServerErrorException();
    }
  }

  private async createUniqueHashAlias(url: string, attempts = 2) {
    if (attempts === 0) {
      throw new ConflictException();
    }

    const alias = this.hashService.create(url);

    const shortenedAliasAlreadyExists = await this.shortenModel.findOne({
      alias,
    });

    if (shortenedAliasAlreadyExists) {
      return this.createUniqueHashAlias(url);
    }

    return alias;
  }
}
