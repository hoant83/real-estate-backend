import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  email: string;

  fullName: string;

  @IsNotEmpty()
  phone: string;

  place: string;

  password: string;
}
