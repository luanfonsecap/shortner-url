import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ShortenController } from './shorten.controller';
import { HashModule } from '../hash/hash.module';
import { HashService } from '../hash/services';
import { ShortenService } from './services/shorten.service';
import { ShortenSchema } from './schemas/shorten.schema';

@Module({
  controllers: [ShortenController],
  imports: [
    HashModule,
    MongooseModule.forFeature([{ name: 'Shorten', schema: ShortenSchema }]),
  ],
  providers: [HashService, ShortenService],
  exports: [ShortenService],
})
export class ShortenModule {}
