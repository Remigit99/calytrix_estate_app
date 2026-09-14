import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { Role } from '../generated/prisma/enums';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  CurrentUser,
  type JwtUser,
} from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { UpdateInquiryDto } from './dto/update-inquiry.dto';
import { InquiriesService } from './inquiries.service';

@Controller()
@UseGuards(JwtAuthGuard)
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  @Post('properties/:propertyId/inquiries')
  createInquiry(
    @CurrentUser() user: JwtUser,
    @Param('propertyId') propertyId: string,
    @Body() dto: CreateInquiryDto,
  ) {
    return this.inquiriesService.createInquiry(
      user.id,
      propertyId,
      dto.message,
    );
  }

  @Get('users/me/inquiries')
  getUserInquiries(@CurrentUser() user: JwtUser) {
    return this.inquiriesService.getUserInquiries(user.id);
  }

  @Get('agent/inquiries')
  @UseGuards(RolesGuard)
  @Roles(Role.AGENT)
  getAgentInquiries(@CurrentUser() user: JwtUser) {
    return this.inquiriesService.getAgentInquiries(user.id);
  }

  @Patch('inquiries/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.AGENT, Role.ADMIN)
  updateInquiry(
    @CurrentUser() user: JwtUser,
    @Param('id') inquiryId: string,
    @Body() dto: UpdateInquiryDto,
  ) {
    return this.inquiriesService.updateInquiry(
      inquiryId,
      user.id,
      user.role,
      dto,
    );
  }

  @Get('admin/inquiries')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  getAdminInquiries() {
    return this.inquiriesService.getAdminInquiries();
  }
}
