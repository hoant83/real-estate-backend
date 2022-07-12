import { IsNotEmpty } from 'class-validator';

export class SigninUserDto {
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  password: string;
}
