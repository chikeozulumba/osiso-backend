import { IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  // @Length(11, 11, { message: 'Phone number is of an invalid format.' } as any)
  readonly phoneNumber: string;

  @IsString({ message: 'Invalid password format.' })
  @Length(6, 20)
  readonly password: string;
}
