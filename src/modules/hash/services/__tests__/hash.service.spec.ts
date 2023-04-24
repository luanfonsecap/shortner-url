import { Test } from '@nestjs/testing';

import { HashService } from '../hash.service';

describe('Hash Service Unit Tests', async () => {
  let hashService: HashService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [HashService],
    }).compile();

    hashService = moduleRef.get<HashService>(HashService);
  });

  it('should be able to hash a string', () => {
    const hash = hashService.create('test');

    expect(hash).toBeDefined();
  });

  it('should be able to hash a string with a length of 6 ~ 10', () => {
    const hash = hashService.create('test');

    expect(hash.length).toBeGreaterThanOrEqual(6);
    expect(hash.length).toBeLessThanOrEqual(10);
  });
});
