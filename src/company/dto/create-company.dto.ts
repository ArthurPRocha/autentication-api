import { IsUrl, MaxLength, MinLength } from 'class-validator';

export class CreateCompanyDTO {
  @MinLength(2)
  @MaxLength(20)
  name: string;

  file: Express.Multer.File;
}
