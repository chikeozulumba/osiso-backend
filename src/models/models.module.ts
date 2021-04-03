import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RiderModule } from './riders/riders.module';
import { ModelsRepository } from './models.repository';
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [UsersModule, RiderModule, CountriesModule],
  providers: [ModelsRepository],
  exports: [ModelsRepository],
})
export class ModelsModule {}
