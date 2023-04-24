import { createHash } from 'crypto';

export class HashService {
  create(key: string) {
    const salt = Math.floor(key.length * 1000).toString();
    const hash = createHash('sha256')
      .update(key + salt)
      .digest('hex');

    const randomLength = Math.floor(Math.random() * 5) + 6; // 6 ~ 10
    const truncatedHash = hash.slice(0, randomLength);

    return truncatedHash;
  }
}
