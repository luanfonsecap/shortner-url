import { Injectable, Logger } from '@nestjs/common';
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
    return this.shortenModel.find().sort({ hints: -1 }).limit(10).exec();
  }
}
