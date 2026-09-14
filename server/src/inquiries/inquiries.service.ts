import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  //  InquiryStatus,
  Role,
} from '../generated/prisma/enums';
import { PrismaService } from '../prisma/prisma.service';

import { UpdateInquiryDto } from './dto/update-inquiry.dto';

@Injectable()
export class InquiriesService {
  constructor(private readonly prisma: PrismaService) {}

  async createInquiry(userId: string, propertyId: string, message: string) {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      throw new ConflictException('Inquiry message cannot be empty');
    }

    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
      select: {
        id: true,
        listingStatus: true,
      },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    if (property.listingStatus !== 'PUBLISHED') {
      throw new ConflictException(
        'Inquiries can only be sent for published properties',
      );
    }

    return this.prisma.inquiry.create({
      data: {
        propertyId,
        senderId: userId,
        message: trimmedMessage,
      },
      include: this.inquiryInclude,
    });
  }

  async getUserInquiries(userId: string) {
    return this.prisma.inquiry.findMany({
      where: {
        senderId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: this.inquiryInclude,
    });
  }

  async getAgentInquiries(agentId: string) {
    return this.prisma.inquiry.findMany({
      where: {
        property: {
          agentId,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: this.inquiryInclude,
    });
  }

  async getAdminInquiries() {
    return this.prisma.inquiry.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: this.inquiryInclude,
    });
  }

  async updateInquiry(
    inquiryId: string,
    actorId: string,
    actorRole: Role,
    dto: UpdateInquiryDto,
  ) {
    const inquiry = await this.prisma.inquiry.findUnique({
      where: { id: inquiryId },
      select: {
        id: true,
        property: {
          select: {
            agentId: true,
          },
        },
      },
    });

    if (!inquiry) {
      throw new NotFoundException('Inquiry not found');
    }

    const isAdmin = actorRole === Role.ADMIN;
    const isPropertyOwner = inquiry.property.agentId === actorId;

    if (!isAdmin && !isPropertyOwner) {
      throw new ForbiddenException(
        'You do not have permission to update this inquiry',
      );
    }

    return this.prisma.inquiry.update({
      where: {
        id: inquiryId,
      },
      data: {
        status: dto.status,
      },
      include: this.inquiryInclude,
    });
  }

  private readonly inquiryInclude = {
    property: {
      include: {
        images: {
          orderBy: {
            position: 'asc' as const,
          },
        },
        agent: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
      },
    },
    sender: {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
      },
    },
  } as const;
}
