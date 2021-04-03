import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { RedisConfigService } from './config.service';

/**
 * Import and provide database configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        REDIS_PASSWORD: Joi.string().allow(null, '').optional(),
        REDIS_URL: Joi.string().allow(null, '').optional(),
        REDIS_DATABASE: Joi.string().optional(),
      }),
    }),
  ],
  providers: [ConfigService, RedisConfigService],
  exports: [ConfigService, RedisConfigService],
})
export class RedisDatabaseConfigModule {}
