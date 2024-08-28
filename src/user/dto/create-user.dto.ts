import {
  IsEmail,
  IsNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsStrongPassword({
    minLength: 8,
  })
  password: string;

  @IsString()
  companyId: string;
}
