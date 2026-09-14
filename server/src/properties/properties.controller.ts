import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  CurrentUser,
  type JwtUser,
} from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

import { Role } from '../generated/prisma/enums';

import { CreatePropertyDto } from './dto/create-property.dto';
import { PropertyQueryDto } from './dto/property-query.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { CreatePropertyImageDto } from './dto/create-property-image.dto';
import { UpdatePropertyImageDto } from './dto/update-property-image.dto';
import { PropertiesService } from './properties.service';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  findAll(@Query() query: PropertyQueryDto) {
    return this.propertiesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findPublicById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENT)
  create(@CurrentUser() user: JwtUser, @Body() dto: CreatePropertyDto) {
    return this.propertiesService.create(user.id, dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENT, Role.ADMIN)
  update(
    @Param('id') id: string,
    @CurrentUser() user: JwtUser,
    @Body() dto: UpdatePropertyDto,
  ) {
    return this.propertiesService.update(id, user.id, user.role, dto);
  }

  @Patch(':id/publish')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENT, Role.ADMIN)
  publish(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.propertiesService.publish(id, user.id, user.role);
  }

  @Patch(':id/archive')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENT, Role.ADMIN)
  archive(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.propertiesService.archive(id, user.id, user.role);
  }

  @Patch(':id/restore')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENT, Role.ADMIN)
  restore(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.propertiesService.restore(id, user.id, user.role);
  }

  @Get(':id/images')
  findImages(@Param('id') id: string) {
    return this.propertiesService.findImages(id);
  }

  @Post(':id/images')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENT, Role.ADMIN)
  addImage(
    @Param('id') id: string,
    @CurrentUser() user: JwtUser,
    @Body() dto: CreatePropertyImageDto,
  ) {
    return this.propertiesService.addImage(id, user.id, user.role, dto);
  }

  @Patch(':id/images/:imageId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENT, Role.ADMIN)
  updateImage(
    @Param('id') id: string,
    @Param('imageId') imageId: string,
    @CurrentUser() user: JwtUser,
    @Body() dto: UpdatePropertyImageDto,
  ) {
    return this.propertiesService.updateImage(
      id,
      imageId,
      user.id,
      user.role,
      dto,
    );
  }

  @Delete(':id/images/:imageId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.AGENT, Role.ADMIN)
  deleteImage(
    @Param('id') id: string,
    @Param('imageId') imageId: string,
    @CurrentUser() user: JwtUser,
  ) {
    return this.propertiesService.deleteImage(id, imageId, user.id, user.role);
  }
}
