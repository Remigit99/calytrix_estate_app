import { IsEnum } from 'class-validator';

import { InquiryStatus } from '../../generated/prisma/enums';

export class UpdateInquiryDto {
  @IsEnum(InquiryStatus)
  status!: InquiryStatus;
}
