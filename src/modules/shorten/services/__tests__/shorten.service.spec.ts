import { Test } from '@nestjs/testing';

import { ShortenService } from '../shorten.service';
import { HashService } from '../../../hash/services/hash.service';
import { AliasExistsException } from '../../../../common/exceptions/aliasExists.exception';
import { AliasNotFoundException } from '../../../../common/exceptions/aliasNotFound.exception';
import { ConflictException } from '@nestjs/common';

describe('Shorten Service Unit Tests', () => {
  let shortenService: ShortenService;

  const mockShortenModel = {
    create: jest.fn().mockResolvedValue({
      save: jest.fn().mockResolvedValue({
        alias: 'test',
        url: 'test',
      }),
    }),
    findOne: jest.fn().mockResolvedValue(null),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        HashService,
        ShortenService,
        {
          provide: 'ShortenModel',
          useValue: mockShortenModel,
        },
      ],
    }).compile();

    shortenService = moduleRef.get<ShortenService>(ShortenService);
  });

  it('should be able to create a shortened URL', async () => {
    const shortenedURL = await shortenService.createShortenedURL('test');

    expect(shortenedURL).toHaveProperty('alias');
    expect(shortenedURL).toHaveProperty('url');
    expect(shortenedURL).toHaveProperty('statistics');
  });

  it('should be able to create a shortened URL with a custom alias', async () => {
    mockShortenModel.findOne.mockResolvedValue(null);
    const shortenedURL = await shortenService.createShortenedURLWithCustomAlias(
      'test',
      'test',
    );

    expect(shortenedURL).toMatchObject({
      alias: 'test',
      url: 'test',
      statistics: expect.any(Object),
    });
  });

  it('should be throw an error if the custom alias already exists', async () => {
    mockShortenModel.findOne.mockResolvedValue({
      alias: 'test',
      url: 'test',
    });

    expect(
      shortenService.createShortenedURLWithCustomAlias('test', 'test'),
    ).rejects.toThrowError();
    expect(
      shortenService.createShortenedURLWithCustomAlias('test', 'test'),
    ).rejects.toBeInstanceOf(AliasExistsException);
  });

  it('should throw an error if the shortened URL does not exist', async () => {
    mockShortenModel.findOne.mockResolvedValue(null);

    expect(shortenService.retrieveOriginalURL('test')).rejects.toThrowError();
    expect(shortenService.retrieveOriginalURL('test')).rejects.toBeInstanceOf(
      AliasNotFoundException,
    );
  });

  it('should be throw an error if reached the maximum number of retries', async () => {
    mockShortenModel.findOne.mockResolvedValue(true);

    expect(() =>
      shortenService.createUniqueHashAlias('test'),
    ).rejects.toThrowError();
    expect(() =>
      shortenService.createUniqueHashAlias('test'),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
