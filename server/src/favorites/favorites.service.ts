import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async addFavorite(userId: string, propertyId: string) {
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
      throw new ConflictException('Only published properties can be favorited');
    }

    const existingFavorite = await this.prisma.favorite.findUnique({
      where: {
        userId_propertyId: {
          userId,
          propertyId,
        },
      },
      include: {
        property: {
          include: {
            images: {
              orderBy: {
                position: 'asc',
              },
            },
          },
        },
      },
    });

    if (existingFavorite) {
      return existingFavorite;
    }

    return this.prisma.favorite.create({
      data: {
        userId,
        propertyId,
      },
      include: {
        property: {
          include: {
            images: {
              orderBy: {
                position: 'asc',
              },
            },
          },
        },
      },
    });
  }

  async removeFavorite(userId: string, propertyId: string) {
    const favorite = await this.prisma.favorite.findUnique({
      where: {
        userId_propertyId: {
          userId,
          propertyId,
        },
      },
    });

    if (!favorite) {
      return {
        message: 'Property removed from favorites',
      };
    }

    await this.prisma.favorite.delete({
      where: {
        id: favorite.id,
      },
    });

    return {
      message: 'Property removed from favorites',
    };
  }

  async getUserFavorites(userId: string) {
    return this.prisma.favorite.findMany({
      where: {
        userId,
        property: {
          listingStatus: {
            not: 'ARCHIVED',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        property: {
          include: {
            images: {
              orderBy: {
                position: 'asc',
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
      },
    });
  }
}
