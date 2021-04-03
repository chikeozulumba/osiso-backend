import { NestFactory } from '@nestjs/core';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );
  const appConfig: AppConfigService = app.get('AppConfigService');
  await app.listen(appConfig.port);
}
bootstrap();
