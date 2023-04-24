import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';
import { HashModule } from './modules/hash/hash.module';
import { ShortenModule } from './modules/shorten/shorten.module';
import { FavoritesModule } from './modules/favorites/favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      dbName: 'shorten-server',
    }),
    HashModule,
    ShortenModule,
    FavoritesModule,
  ],
})
export class AppModule {}
