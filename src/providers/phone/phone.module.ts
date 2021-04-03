import { Module } from '@nestjs/common';
import { PhoneNumberService } from './phone.service';

@Module({
  imports: [],
  providers: [PhoneNumberService],
  exports: [PhoneNumberService],
})
export class PhoneNumberProviderModule {}
