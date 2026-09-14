import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  //   Matches,
  MaxLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(2, 50)
  firstName!: string;

  @IsString()
  @Length(2, 50)
  lastName!: string;

  @IsEmail()
  @MaxLength(255)
  email!: string;

  @IsString()
  @Length(8, 100)
  password!: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string;
}
