import { IsString, Length } from 'class-validator';

export class CreateInquiryDto {
  @IsString()
  @Length(10, 2000)
  message!: string;
}
