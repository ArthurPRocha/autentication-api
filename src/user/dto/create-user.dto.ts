import { IsEmail, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  name: string;

  @IsStrongPassword({
    minLength: 8,
  })
  password: string;
}
