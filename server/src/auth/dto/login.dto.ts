import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'Password123!',
    minLength: 8,
    maxLength: 100,
  })
  @IsString()
  @Length(8, 100)
  password!: string;
}
