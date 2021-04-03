import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { MongoConfigService } from './config.service';

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
        MONGO_URL: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService, MongoConfigService],
  exports: [ConfigService, MongoConfigService],
})
export class MongoDatabaseConfigModule {}
