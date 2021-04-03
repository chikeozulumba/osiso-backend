import { Module } from '@nestjs/common';
import { MongoDatabaseProviderModule } from './database/mongo/mongo.module';
import { PhoneNumberProviderModule } from './phone/phone.module';
import { PostgresDatabaseProviderModule } from './database/postgres/postgres.module';
import { JwtProviderModule } from './jwt/jwt.module';
import { CacheProviderModule } from './cache/cache.module';

@Module({
  imports: [
    PostgresDatabaseProviderModule,
    MongoDatabaseProviderModule,
    PhoneNumberProviderModule,
    JwtProviderModule,
    CacheProviderModule,
  ],
})
export class RootProviderModule {}
