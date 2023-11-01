import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisCacheService {
  private readonly redis: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient();
  }

  async get(key: string): Promise<string> {
    return await this.redis.get(key);
  }

  /**
   * key-value 저장
   *
   * @param key 레디스에 저장할 키
   * @param value 레디스에 저장할 값
   * @param expire 유효기간 - 초 단위
   * @returns 완료 후 'OK'를 반환
   */
  async set(key: string, value: any, expire = 3600): Promise<'OK'> {
    return await this.redis.set(key, value, 'EX', expire);
  }

  async reset() {
    await this.redis.reset();
  }

  async del(key: string): Promise<number> {
    return await this.redis.del(key);
  }
}
