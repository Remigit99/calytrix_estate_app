import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  //   Matches,
  MaxLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'John',
  })
  @IsString()
  @Length(2, 50)
  firstName!: string;

  @ApiProperty({
    example: 'Doe',
  })
  @IsString()
  @Length(2, 50)
  lastName!: string;

  @ApiProperty({
    example: 'john@example.com',
  })
  @IsEmail()
  @MaxLength(255)
  email!: string;

  @ApiProperty({
    example: 'Password123!',
    minLength: 8,
    maxLength: 100,
  })
  @IsString()
  @Length(8, 100)
  password!: string;

  @ApiPropertyOptional({
    example: '+2348012345678',
  })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string;
}
