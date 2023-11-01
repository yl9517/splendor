import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RedisCacheService } from './redis.service';
import { RedisConfigService } from './redis.config';

describe('RedisService', () => {
  let service: RedisCacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        RedisModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useClass: RedisConfigService,
        }),
      ],
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
