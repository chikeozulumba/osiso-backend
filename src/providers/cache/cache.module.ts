import { Module } from '@nestjs/common';
import { RedisProviderModule } from './redis/redis.module';

@Module({
  imports: [RedisProviderModule],
  exports: [RedisProviderModule],
})
export class CacheProviderModule {}
