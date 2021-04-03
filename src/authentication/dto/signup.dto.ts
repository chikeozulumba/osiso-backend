import { IsString, IsEmail } from 'class-validator';

export class SignUpDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly scope: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly phoneNumber: string;

  @IsString()
  readonly password: string;

  // @IsString()
  // readonly nin: string;

  // @IsString()
  // readonly motorcycleName: string;

  // @IsString()
  // readonly motorcycleModel: string;

  // @IsString()
  // readonly motorcycleRegisterationNumber: string;

  // @IsString()
  // readonly motorcycleRegisterationState: string;
}
