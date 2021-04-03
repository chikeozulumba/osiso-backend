import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { AppConfigService } from './config.service';
/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        APP_NAME: Joi.string().required(),
        APP_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .required(),
        APP_URL: Joi.string().required(),
        APP_PORT: Joi.number().default(9000),
        JWT_SECRET_KEY: Joi.string().required(),
        JWT_EXPIRES: Joi.string().required(),
        PASSWORD_RESET_TTL: Joi.number().required(),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
