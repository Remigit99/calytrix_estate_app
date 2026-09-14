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
import {
  getPagination,
  getPaginationMeta,
} from 'src/common/pagination/pagination.utils';
import { PaginationDto } from 'src/common/pagination/pagination.dto';

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

  // async getUserInquiries(userId: string) {
  //   return this.prisma.inquiry.findMany({
  //     where: {
  //       senderId: userId,
  //     },
  //     orderBy: {
  //       createdAt: 'desc',
  //     },
  //     include: this.inquiryInclude,
  //   });
  // }

  async getUserInquiries(userId: string, query: PaginationDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const where = {
      senderId: userId,
    };

    const { skip, take } = getPagination(page, limit);

    const [data, total] = await Promise.all([
      this.prisma.inquiry.findMany({
        where,
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
        include: this.inquiryInclude,
      }),

      this.prisma.inquiry.count({
        where,
      }),
    ]);

    return {
      data,
      meta: getPaginationMeta(page, limit, total),
    };
  }

  // async getAgentInquiries(agentId: string) {
  //   return this.prisma.inquiry.findMany({
  //     where: {
  //       property: {
  //         agentId,
  //       },
  //     },
  //     orderBy: {
  //       createdAt: 'desc',
  //     },
  //     include: this.inquiryInclude,
  //   });
  // }

  async getAgentInquiries(agentId: string, query: PaginationDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const where = {
      property: {
        agentId,
      },
    };

    const { skip, take } = getPagination(page, limit);

    const [data, total] = await Promise.all([
      this.prisma.inquiry.findMany({
        where,
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
        include: this.inquiryInclude,
      }),

      this.prisma.inquiry.count({
        where,
      }),
    ]);

    return {
      data,
      meta: getPaginationMeta(page, limit, total),
    };
  }

  // async getAdminInquiries() {
  //   return this.prisma.inquiry.findMany({
  //     orderBy: {
  //       createdAt: 'desc',
  //     },
  //     include: this.inquiryInclude,
  //   });
  // }

  async getAdminInquiries(query: PaginationDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const { skip, take } = getPagination(page, limit);

    const [data, total] = await Promise.all([
      this.prisma.inquiry.findMany({
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
        include: this.inquiryInclude,
      }),

      this.prisma.inquiry.count(),
    ]);

    return {
      data,
      meta: getPaginationMeta(page, limit, total),
    };
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
