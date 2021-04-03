import { IsString } from 'class-validator';

export class PasswordResetInitiateDTO {
  @IsString()
  readonly phoneNumber: string;
}
