import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { RootProviderModule } from './providers/provider.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ModelsModule } from './models/models.module';
import { JwtAuthGuard } from './common/guards/authentication/jwt-auth.guard';

/**
 * @description App module
 *
 * @export
 * @class AppModule
 */
@Module({
  imports: [
    AppConfigModule,
    RootProviderModule,
    ModelsModule,
    AuthenticationModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
