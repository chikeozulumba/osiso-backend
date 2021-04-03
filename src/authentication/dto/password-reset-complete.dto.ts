import { IsNumber, IsString, MinLength } from 'class-validator';

export class PasswordResetCompleteDTO {
  @IsString()
  readonly phoneNumber: string;

  @IsNumber()
  readonly code: number;

  @IsString()
  readonly password: string;

  @IsString()
  readonly confirmPassword: string;
}
