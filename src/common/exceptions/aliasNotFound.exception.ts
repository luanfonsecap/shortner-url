import { HttpException, HttpStatus } from '@nestjs/common';

export class AliasNotFoundException extends HttpException {
  constructor() {
    super(
      {
        ERR_CODE: '002',
        Description: 'SHORTENED URL NOT FOUND',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
