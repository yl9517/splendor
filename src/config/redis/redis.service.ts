import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private redis: Cache) {}

  async get(key: string): Promise<string> {
    return await this.redis.get(key);
  }

  /**
   * key-value 저장
   *
   * @param key 레디스에 저장할 키
   * @param value 레디스에 저장할 값
   * @returns 완료 후 'OK'를 반환
   */
  async set(key: string, value: any, option?: any): Promise<'OK'> {
    return await this.redis.set(key, value, option);
  }

  async reset() {
    await this.redis.reset();
  }

  async del(key: string): Promise<number> {
    return await this.redis.del(key);
  }
}
