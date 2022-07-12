import { IsNotEmpty } from 'class-validator';

export class ForgotPassword {
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  newPassword: string;
}
