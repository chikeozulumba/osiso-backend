import {
  CacheModule,
  CACHE_MANAGER,
  Inject,
  Logger,
  Module,
  OnModuleInit,
} from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import { Cache as CacheManager } from 'cache-manager';

import { RedisConfigService } from '../../../config/database/redis/config.service';
import { RedisDatabaseConfigModule } from '../../../config/database/redis/config.module';
import { AppConfigService } from './../../../config/app/config.service';
import { AppConfigModule } from '../../../config/app/config.module';

@Module({
  imports: [
    AppConfigModule,
    CacheModule.registerAsync({
      imports: [RedisDatabaseConfigModule],
      useFactory: async (redisConfigService: RedisConfigService) => ({
        store: redisStore,
        host: redisConfigService.host,
        port: redisConfigService.port,
        password: redisConfigService.password,
        db: redisConfigService.db,
      }),
      inject: [RedisConfigService],
    }),
  ],
  exports: [CacheModule],
})
export class RedisProviderModule implements OnModuleInit {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: CacheManager,
    private readonly appConfigService: AppConfigService,
  ) {}

  public onModuleInit(): any {
    if (this.appConfigService.env !== 'development') return;
    const logger = new Logger('Cache');
    // Commands that are interesting to log
    const commands = ['get', 'set', 'del'];
    const cache = this.cache;
    commands.forEach((commandName) => {
      const oldCommand = cache[commandName];
      cache[commandName] = async (...args) => {
        // Computes the duration
        const start = new Date();
        const result = await oldCommand.call(cache, ...args);
        const end = new Date();
        const duration = end.getTime() - start.getTime();

        // Avoid logging the options
        args = args.slice(0, 2);
        logger.log(
          `${commandName.toUpperCase()} ${args.join(', ')} - ${duration}ms`,
        );

        return result;
      };
    });
  }
}
