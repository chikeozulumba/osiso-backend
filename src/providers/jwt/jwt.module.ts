import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from '../../config/app/config.module';
import { AppConfigService } from '../../config/app/config.service';

@Module({
  exports: [JwtModule],
  imports: [
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: async (appConfigService: AppConfigService) => ({
        secret: appConfigService.jwtSecret,
        signOptions: { expiresIn: appConfigService.jwtExpires },
      }),
      inject: [AppConfigService],
    }),
  ],
})
export class JwtProviderModule {}
