import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

import { Role } from '../../generated/prisma/enums';

export class UpdateUserAdminDto {
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
