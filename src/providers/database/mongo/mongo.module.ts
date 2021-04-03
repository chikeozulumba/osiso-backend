import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDatabaseConfigModule } from '../../../config/database/mongo/config.module';
import { MongoConfigService } from './../../../config/database/mongo/config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [MongoDatabaseConfigModule],
      inject: [MongoConfigService],
      useFactory: async (mongoConfigService: MongoConfigService) => ({
        uri: mongoConfigService.uri,
      }),
    }),
  ],
})
export class MongoDatabaseProviderModule {}
