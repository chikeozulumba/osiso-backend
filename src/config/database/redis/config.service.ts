import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service dealing with redis config operations.
 *
 * @class
 */
@Injectable()
export class RedisConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('redis.host');
  }

  get port(): number {
    return +this.configService.get<number>('redis.port');
  }

  get password(): string {
    return String(this.configService.get<string>('redis.password'));
  }

  get url(): string {
    return String(this.configService.get<string>('redis.url'));
  }

  get db(): number {
    return Number(this.configService.get<number>('redis.database'));
  }
}
