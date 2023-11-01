import { Module } from '@nestjs/common';
import { RedisCacheService } from './redis.service';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import * as dotenv from 'dotenv';
dotenv.config();

const cacheModule = CacheModule.register({
  useFactory: async () => ({
    isGlobal: true,
    store: redisStore,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    ttl: 10000, // 캐시 유지 시간
  }),
});

@Module({
  imports: [cacheModule],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
