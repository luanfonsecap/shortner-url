import { Module } from '@nestjs/common';

import { HashService } from './services';

@Module({
  exports: [HashService],
})
export class HashModule {}
