import { Test, TestingModule } from '@nestjs/testing';
import { RedisCacheService } from './redis.service';
import { redisStore } from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';

describe('RedisService', () => {
  let service: RedisCacheService;

  beforeEach(async () => {
    const cacheModule = CacheModule.register({
      useFactory: async () => ({
        isGlobal: true,
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        ttl: 10000, // 캐시 유지 시간
      }),
    });
    const module: TestingModule = await Test.createTestingModule({
      imports: [cacheModule],
      providers: [RedisCacheService],
    }).compile();

    service = module.get<RedisCacheService>(RedisCacheService);
  });

  it('should be defined', () => {
    expect(service.set).toBeDefined();
  });

  it('should return Ok', async () => {
    const result = await service.set('test', 'valuekey');
    expect(result).toBe('OK');
  });

  it('should be defined', () => {
    expect(service.get).toBeDefined();
  });

  it('should return valuekey', async () => {
    await service.set('test', 'valuekey');
    const result = await service.get('test');
    expect(result).toBe('valuekey');
  });
});
