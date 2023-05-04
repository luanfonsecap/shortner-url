import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Shorten } from '../../../modules/shorten/schemas/shorten.schema';

@Injectable()
export class FavoritesService {
  private readonly logger = new Logger(FavoritesService.name);

  constructor(
    @InjectModel(Shorten.name) private readonly shortenModel: Model<Shorten>,
  ) {}

  async recoverTop() {
    try {
      return this.shortenModel.find().sort({ hints: -1 }).limit(10).exec();
    } catch (error) {
      this.logger.error(
        'An error has ocurred while recovering top urls',
        error,
      );
      throw new InternalServerErrorException();
    }
  }
}
