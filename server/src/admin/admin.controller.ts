import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  CurrentUser,
  type JwtUser,
} from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../generated/prisma/enums';

import { UpdateUserAdminDto } from './dto/update-user-admin.dto';
import { AdminService } from './admin.service';
import { UpdatePropertyDto } from 'src/properties/dto/update-property.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  getStats() {
    return this.adminService.getStats();
  }

  @Get('users')
  getUsers() {
    return this.adminService.getUsers();
  }

  @Get('users/:id')
  getUser(@Param('id') userId: string) {
    return this.adminService.getUser(userId);
  }

  @Patch('users/:id')
  updateUser(
    @Param('id') userId: string,
    @CurrentUser() admin: JwtUser,
    @Body() dto: UpdateUserAdminDto,
  ) {
    return this.adminService.updateUser(userId, admin.id, dto);
  }

  @Patch('properties/:id')
  updateProperty(
    @Param('id') propertyId: string,
    @CurrentUser() admin: JwtUser,
    @Body() dto: UpdatePropertyDto,
  ) {
    return this.adminService.updateProperty(propertyId, admin.id, dto);
  }

  @Patch('properties/:id/publish')
  publishProperty(
    @Param('id') propertyId: string,
    @CurrentUser() admin: JwtUser,
  ) {
    return this.adminService.publishProperty(propertyId, admin.id);
  }

  @Patch('properties/:id/archive')
  archiveProperty(
    @Param('id') propertyId: string,
    @CurrentUser() admin: JwtUser,
  ) {
    return this.adminService.archiveProperty(propertyId, admin.id);
  }
}
