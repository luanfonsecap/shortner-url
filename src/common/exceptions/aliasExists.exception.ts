import { HttpException, HttpStatus } from '@nestjs/common';

export class AliasExistsException extends HttpException {
  constructor() {
    super(
      {
        ERR_CODE: '001',
        Description: 'CUSTOM ALIAS ALREADY EXISTS',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
