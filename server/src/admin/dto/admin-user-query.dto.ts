import { IsEnum, IsOptional } from 'class-validator';

import { Role } from '../../generated/prisma/enums';
import { PaginationDto } from '../../common/pagination/pagination.dto';

export class AdminUserQueryDto extends PaginationDto {
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
