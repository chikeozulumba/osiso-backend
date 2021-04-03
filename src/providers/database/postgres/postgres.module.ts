import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PostgresDatabaseConfigModule } from '../../../config/database/postgres/config.module';
import { PostgresConfigService } from '../../../config/database/postgres/config.service';
import { User } from '../../../models/users/entities/user.entity';
import { UserType } from '../../../models/user-type/entities/user-type.entity';
import { Rider } from '../../../models/riders/entities/rider.entity';
import { Country } from '../../../models/countries/entities/country.entity';
import { State } from '../../../models/states/entities/state.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PostgresDatabaseConfigModule],
      useFactory: async (postgresConfigService: PostgresConfigService) => ({
        type: postgresConfigService.type as DatabaseType,
        host: postgresConfigService.host,
        port: postgresConfigService.port,
        username: postgresConfigService.username,
        password: postgresConfigService.password,
        database: postgresConfigService.database,
        entities: [User, UserType, Rider, Country, State],
      }),
      inject: [PostgresConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class PostgresDatabaseProviderModule {}
