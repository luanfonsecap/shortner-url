import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';
import { HashModule } from './modules/hash/hash.module';
import { ShortenModule } from './modules/shorten/shorten.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      dbName: 'shorten-server',
    }),
    HashModule,
    ShortenModule,
  ],
})
export class AppModule {}
