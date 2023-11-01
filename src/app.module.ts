import { Module } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { RedisCacheModule } from '@config/redis/redis.module';

@Module({
  imports: [RedisCacheModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
