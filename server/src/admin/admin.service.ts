import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Role } from '../generated/prisma/enums';
import { PrismaService } from '../prisma/prisma.service';

import { UpdateUserAdminDto } from './dto/update-user-admin.dto';
import { PropertiesService } from 'src/properties/properties.service';
import { UpdatePropertyDto } from 'src/properties/dto/update-property.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly propertiesService: PropertiesService,
  ) {}

  async getUsers() {
    return this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: this.userSelect,
    });
  }

  async getUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: this.userSelect,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUser(userId: string, adminId: string, dto: UpdateUserAdminDto) {
    if (
      userId === adminId &&
      (dto.isActive === false ||
        (dto.role !== undefined && dto.role !== Role.ADMIN))
    ) {
      throw new ForbiddenException(
        'You cannot remove your own admin privileges',
      );
    }
    // if (userId === adminId && dto.isActive === false) {
    //   throw new ForbiddenException(
    //     'You cannot deactivate your own admin account',
    //   );
    // }

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...(dto.role !== undefined && {
          role: dto.role,
        }),
        ...(dto.isActive !== undefined && {
          isActive: dto.isActive,
        }),
      },
      select: this.userSelect,
    });
  }

  async getStats() {
    const [
      totalUsers,
      totalAgents,
      totalAdmins,
      totalProperties,
      publishedProperties,
      draftProperties,
      archivedProperties,
      availableProperties,
      soldProperties,
      rentedProperties,
      pendingInquiries,
      contactedInquiries,
      closedInquiries,
    ] = await Promise.all([
      this.prisma.user.count(),

      this.prisma.user.count({
        where: {
          role: Role.AGENT,
        },
      }),

      this.prisma.user.count({
        where: {
          role: Role.ADMIN,
        },
      }),

      this.prisma.property.count(),

      this.prisma.property.count({
        where: {
          listingStatus: 'PUBLISHED',
        },
      }),

      this.prisma.property.count({
        where: {
          listingStatus: 'DRAFT',
        },
      }),

      this.prisma.property.count({
        where: {
          listingStatus: 'ARCHIVED',
        },
      }),

      this.prisma.property.count({
        where: {
          availability: 'AVAILABLE',
        },
      }),

      this.prisma.property.count({
        where: {
          availability: 'SOLD',
        },
      }),

      this.prisma.property.count({
        where: {
          availability: 'RENTED',
        },
      }),

      this.prisma.inquiry.count({
        where: {
          status: 'PENDING',
        },
      }),

      this.prisma.inquiry.count({
        where: {
          status: 'CONTACTED',
        },
      }),

      this.prisma.inquiry.count({
        where: {
          status: 'CLOSED',
        },
      }),
    ]);

    return {
      users: {
        total: totalUsers,
        agents: totalAgents,
        admins: totalAdmins,
      },
      properties: {
        total: totalProperties,
        published: publishedProperties,
        draft: draftProperties,
        archived: archivedProperties,
        available: availableProperties,
        sold: soldProperties,
        rented: rentedProperties,
      },
      inquiries: {
        pending: pendingInquiries,
        contacted: contactedInquiries,
        closed: closedInquiries,
        total: pendingInquiries + contactedInquiries + closedInquiries,
      },
    };
  }

  private readonly userSelect = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    role: true,
    isActive: true,
    createdAt: true,
    updatedAt: true,
  } as const;

  async updateProperty(
    propertyId: string,
    adminId: string,
    dto: UpdatePropertyDto,
  ) {
    return this.propertiesService.update(propertyId, adminId, Role.ADMIN, dto);
  }

  async publishProperty(propertyId: string, adminId: string) {
    return this.propertiesService.publish(propertyId, adminId, Role.ADMIN);
  }

  async archiveProperty(propertyId: string, adminId: string) {
    return this.propertiesService.archive(propertyId, adminId, Role.ADMIN);
  }
}
