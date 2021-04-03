import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserType } from '../user-type/entities/user-type.entity';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserType, UsersRepository])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
