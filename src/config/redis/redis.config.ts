import { Injectable } from '@nestjs/common';
import {
  RedisOptionsFactory,
  RedisModuleOptions,
} from '@liaoliaots/nestjs-redis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisConfigService implements RedisOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createRedisOptions(): RedisModuleOptions {
    const host = this.configService.get('REDIS_HOST');
    const port = this.configService.get('REDIS_PORT');
    // const password = this.configService.get('REDIS_PASSWORD');
    return {
      //   readyLog: true,
      config: {
        host,
        port,
        //     password,
      },
    };
  }
}
