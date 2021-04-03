import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '../config/app/config.module';
import { UserType } from '../models/user-type/entities/user-type.entity';
import { UsersModule } from '../models/users/users.module';
import { PhoneNumberProviderModule } from '../providers/phone/phone.module';
import { JwtProviderModule } from '../providers/jwt/jwt.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CacheProviderModule } from '../providers/cache/cache.module';
import { UsersRepository } from '../models/users/users.repository';
import { User } from '../models/users/entities/user.entity';
import { ModelsRepository } from '../models/models.repository';

/**
 *
 *
 * @export
 * @class AuthenticationModule
 */
@Module({
  imports: [
    PassportModule,
    UsersModule,
    PhoneNumberProviderModule,
    TypeOrmModule.forFeature([User, UserType, UsersRepository]),
    JwtProviderModule,
    AppConfigModule,
    CacheProviderModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy],
})
export class AuthenticationModule {}
