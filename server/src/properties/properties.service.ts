import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { Availability, ListingStatus, Role } from '../generated/prisma/enums';

import { CreatePropertyDto } from './dto/create-property.dto';
import { PropertyQueryDto } from './dto/property-query.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { UpdatePropertyImageDto } from './dto/update-property-image.dto';
import { CreatePropertyImageDto } from './dto/create-property-image.dto';

@Injectable()
export class PropertiesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(agentId: string, dto: CreatePropertyDto) {
    return this.prisma.$transaction(async (tx) => {
      const property = await tx.property.create({
        data: {
          title: dto.title.trim(),
          description: dto.description.trim(),
          price: dto.price,
          purpose: dto.purpose,
          propertyType: dto.propertyType,
          availability: dto.availability ?? Availability.AVAILABLE,

          bedrooms: dto.bedrooms,
          bathrooms: dto.bathrooms,
          parkingSpaces: dto.parkingSpaces,

          address: dto.address.trim(),
          city: dto.city.trim(),
          state: dto.state.trim(),
          country: dto.country.trim(),

          latitude: dto.latitude,
          longitude: dto.longitude,

          agentId,
        },
      });

      if (dto.images?.length) {
        const hasPrimary = dto.images.some((image) => image.isPrimary === true);

        await tx.propertyImage.createMany({
          data: dto.images.map((image, index) => ({
            propertyId: property.id,
            url: image.url,
            altText: image.altText?.trim(),
            position: image.position ?? index,
            isPrimary: image.isPrimary ?? (!hasPrimary && index === 0),
          })),
        });
      }

      return tx.property.findUniqueOrThrow({
        where: {
          id: property.id,
        },
        include: this.propertyInclude,
      });
    });
  }

  async findAll(query: PropertyQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 12;

    const where = {
      listingStatus: ListingStatus.PUBLISHED,

      ...(query.city && {
        city: {
          contains: query.city.trim(),
          mode: 'insensitive' as const,
        },
      }),

      ...(query.state && {
        state: {
          contains: query.state.trim(),
          mode: 'insensitive' as const,
        },
      }),

      ...(query.purpose && {
        purpose: query.purpose,
      }),

      ...(query.propertyType && {
        propertyType: query.propertyType,
      }),

      ...(query.bedrooms !== undefined && {
        bedrooms: {
          gte: query.bedrooms,
        },
      }),

      ...((query.minPrice || query.maxPrice) && {
        price: {
          ...(query.minPrice && {
            gte: query.minPrice,
          }),

          ...(query.maxPrice && {
            lte: query.maxPrice,
          }),
        },
      }),
    };

    const orderBy = {
      [query.sortBy ?? 'createdAt']: query.sortOrder ?? 'desc',
    };

    const [properties, total] = await this.prisma.$transaction([
      this.prisma.property.findMany({
        where,
        include: this.propertyInclude,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),

      this.prisma.property.count({
        where,
      }),
    ]);

    return {
      data: properties,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findPublicById(id: string) {
    const property = await this.prisma.property.findFirst({
      where: {
        id,
        listingStatus: ListingStatus.PUBLISHED,
      },
      include: this.propertyInclude,
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    return property;
  }

  async update(
    propertyId: string,
    actorId: string,
    actorRole: Role,
    dto: UpdatePropertyDto,
  ) {
    const property = await this.getProperty(propertyId);

    this.assertCanManage(property.agentId, actorId, actorRole);

    return this.prisma.property.update({
      where: {
        id: propertyId,
      },

      data: {
        ...(dto.title !== undefined && {
          title: dto.title.trim(),
        }),

        ...(dto.description !== undefined && {
          description: dto.description.trim(),
        }),

        ...(dto.price !== undefined && {
          price: dto.price,
        }),

        ...(dto.purpose !== undefined && {
          purpose: dto.purpose,
        }),

        ...(dto.propertyType !== undefined && {
          propertyType: dto.propertyType,
        }),

        ...(dto.availability !== undefined && {
          availability: dto.availability,
        }),

        ...(dto.bedrooms !== undefined && {
          bedrooms: dto.bedrooms,
        }),

        ...(dto.bathrooms !== undefined && {
          bathrooms: dto.bathrooms,
        }),

        ...(dto.parkingSpaces !== undefined && {
          parkingSpaces: dto.parkingSpaces,
        }),

        ...(dto.address !== undefined && {
          address: dto.address.trim(),
        }),

        ...(dto.city !== undefined && {
          city: dto.city.trim(),
        }),

        ...(dto.state !== undefined && {
          state: dto.state.trim(),
        }),

        ...(dto.country !== undefined && {
          country: dto.country.trim(),
        }),

        ...(dto.latitude !== undefined && {
          latitude: dto.latitude,
        }),

        ...(dto.longitude !== undefined && {
          longitude: dto.longitude,
        }),
      },

      include: this.propertyInclude,
    });
  }

  async publish(propertyId: string, actorId: string, actorRole: Role) {
    const property = await this.getProperty(propertyId);

    this.assertCanManage(property.agentId, actorId, actorRole);

    await this.validateForPublishing(propertyId);

    return this.prisma.property.update({
      where: {
        id: propertyId,
      },

      data: {
        listingStatus: ListingStatus.PUBLISHED,
      },

      include: this.propertyInclude,
    });
  }

  async archive(propertyId: string, actorId: string, actorRole: Role) {
    const property = await this.getProperty(propertyId);

    this.assertCanManage(property.agentId, actorId, actorRole);

    return this.prisma.property.update({
      where: {
        id: propertyId,
      },

      data: {
        listingStatus: ListingStatus.ARCHIVED,
      },

      include: this.propertyInclude,
    });
  }

  async restore(propertyId: string, actorId: string, actorRole: Role) {
    const property = await this.getProperty(propertyId);

    this.assertCanManage(property.agentId, actorId, actorRole);

    return this.prisma.property.update({
      where: {
        id: propertyId,
      },

      data: {
        listingStatus: ListingStatus.DRAFT,
      },

      include: this.propertyInclude,
    });
  }

  private async getProperty(id: string) {
    const property = await this.prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    return property;
  }

  private assertCanManage(ownerId: string, actorId: string, actorRole: Role) {
    if (actorRole === Role.ADMIN) {
      return;
    }

    if (actorRole !== Role.AGENT || ownerId !== actorId) {
      throw new ForbiddenException(
        'You do not have permission to manage this property',
      );
    }
  }

  private async validateForPublishing(propertyId: string) {
    const property = await this.prisma.property.findUnique({
      where: {
        id: propertyId,
      },

      include: {
        images: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    const missingFields: string[] = [];

    if (!property.title.trim()) {
      missingFields.push('title');
    }

    if (!property.description.trim()) {
      missingFields.push('description');
    }

    if (!property.price) {
      missingFields.push('price');
    }

    if (!property.purpose) {
      missingFields.push('purpose');
    }

    if (!property.propertyType) {
      missingFields.push('propertyType');
    }

    if (!property.address.trim()) {
      missingFields.push('address');
    }

    if (!property.city.trim()) {
      missingFields.push('city');
    }

    if (!property.state.trim()) {
      missingFields.push('state');
    }

    if (!property.country.trim()) {
      missingFields.push('country');
    }

    if (property.propertyType !== 'LAND' && property.bedrooms === null) {
      missingFields.push('bedrooms');
    }

    if (property.propertyType !== 'LAND' && property.bathrooms === null) {
      missingFields.push('bathrooms');
    }

    if (property.images.length === 0) {
      missingFields.push('image');
    }

    if (missingFields.length > 0) {
      throw new BadRequestException({
        message: 'Property is not ready for publishing',
        missingFields,
      });
    }
  }

  private readonly propertyInclude = {
    images: {
      orderBy: {
        position: 'asc' as const,
      },
    },

    amenities: true,

    agent: {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phone: true,
      },
    },
  } as const;

  async addImage(
    propertyId: string,
    actorId: string,
    actorRole: Role,
    dto: CreatePropertyImageDto,
  ) {
    const property = await this.getProperty(propertyId);

    this.assertCanManage(property.agentId, actorId, actorRole);

    if (dto.isPrimary) {
      await this.prisma.propertyImage.updateMany({
        where: {
          propertyId,
          isPrimary: true,
        },
        data: {
          isPrimary: false,
        },
      });
    }

    return this.prisma.propertyImage.create({
      data: {
        propertyId,
        url: dto.url,
        altText: dto.altText?.trim(),
        position: dto.position ?? 0,
        isPrimary: dto.isPrimary ?? false,
      },
    });
  }

  async updateImage(
    propertyId: string,
    imageId: string,
    actorId: string,
    actorRole: Role,
    dto: UpdatePropertyImageDto,
  ) {
    const property = await this.getProperty(propertyId);

    this.assertCanManage(property.agentId, actorId, actorRole);

    const image = await this.prisma.propertyImage.findFirst({
      where: {
        id: imageId,
        propertyId,
      },
    });

    if (!image) {
      throw new NotFoundException('Property image not found');
    }

    if (dto.isPrimary) {
      await this.prisma.propertyImage.updateMany({
        where: {
          propertyId,
          isPrimary: true,
          id: {
            not: imageId,
          },
        },
        data: {
          isPrimary: false,
        },
      });
    }

    return this.prisma.propertyImage.update({
      where: {
        id: imageId,
      },
      data: {
        ...(dto.url !== undefined && {
          url: dto.url,
        }),

        ...(dto.altText !== undefined && {
          altText: dto.altText.trim(),
        }),

        ...(dto.position !== undefined && {
          position: dto.position,
        }),

        ...(dto.isPrimary !== undefined && {
          isPrimary: dto.isPrimary,
        }),
      },
    });
  }

  async deleteImage(
    propertyId: string,
    imageId: string,
    actorId: string,
    actorRole: Role,
  ) {
    const property = await this.getProperty(propertyId);

    this.assertCanManage(property.agentId, actorId, actorRole);

    const image = await this.prisma.propertyImage.findFirst({
      where: {
        id: imageId,
        propertyId,
      },
    });

    if (!image) {
      throw new NotFoundException('Property image not found');
    }

    await this.prisma.propertyImage.delete({
      where: {
        id: imageId,
      },
    });

    return {
      message: 'Property image deleted successfully',
    };
  }

  async findImages(propertyId: string) {
    const property = await this.prisma.property.findUnique({
      where: {
        id: propertyId,
      },
      select: {
        id: true,
        listingStatus: true,
      },
    });

    if (!property || property.listingStatus === ListingStatus.ARCHIVED) {
      throw new NotFoundException('Property not found');
    }

    return this.prisma.propertyImage.findMany({
      where: {
        propertyId,
      },
      orderBy: {
        position: 'asc',
      },
    });
  }
}
