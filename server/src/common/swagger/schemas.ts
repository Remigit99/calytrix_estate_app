import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApiErrorResponse {
  @ApiProperty({
    example: 400,
  })
  statusCode!: number;

  @ApiProperty({
    example: 'Validation failed',
  })
  message!: string | string[];

  @ApiProperty({
    example: '2026-09-14T14:30:00.000Z',
  })
  timestamp!: string;

  @ApiProperty({
    example: '/api/v1/properties',
  })
  path!: string;
}

export class PaginationMeta {
  @ApiProperty({
    example: 1,
  })
  page!: number;

  @ApiProperty({
    example: 12,
  })
  limit!: number;

  @ApiProperty({
    example: 47,
  })
  total!: number;

  @ApiProperty({
    example: 4,
  })
  totalPages!: number;
}

export class PaginatedResponse {
  @ApiProperty({
    description: 'Array of resources',
    isArray: true,
    example: [],
  })
  data!: unknown[];

  @ApiProperty({
    type: PaginationMeta,
  })
  meta!: PaginationMeta;
}

export class UserResponse {
  @ApiProperty({
    format: 'uuid',
    example: 'c132ab36-9430-4f31-ae1c-c00a575a7d56',
  })
  id!: string;

  @ApiProperty({
    example: 'remi@example.com',
  })
  email!: string;

  @ApiProperty({
    example: 'Abiodun',
  })
  firstName!: string;

  @ApiProperty({
    example: 'Ade',
  })
  lastName!: string;

  @ApiPropertyOptional({
    example: '08000000000',
  })
  phone?: string | null;

  @ApiProperty({
    enum: ['USER', 'AGENT', 'ADMIN'],
    example: 'USER',
  })
  role!: string;

  @ApiProperty({
    example: true,
  })
  isActive!: boolean;

  @ApiProperty({
    example: '2026-09-14T10:00:00.000Z',
  })
  createdAt!: string;

  @ApiProperty({
    example: '2026-09-14T10:00:00.000Z',
  })
  updatedAt!: string;
}

export class AuthResponse {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIs...',
    description: 'Short-lived JWT access token',
  })
  accessToken!: string;

  @ApiProperty({
    type: UserResponse,
  })
  user!: UserResponse;
}

export class PropertyImageResponse {
  @ApiProperty({
    format: 'uuid',
    example: 'e7a8e4b3-7f5a-4b2e-8b3e-4f9e5f5e2a11',
  })
  id!: string;

  @ApiProperty({
    format: 'uri',
    example: 'https://example.com/property-front.jpg',
  })
  url!: string;

  @ApiPropertyOptional({
    example: 'Front view of the property',
  })
  altText?: string | null;

  @ApiProperty({
    example: 0,
  })
  position!: number;

  @ApiProperty({
    example: true,
  })
  isPrimary!: boolean;
}

export class PropertyResponse {
  @ApiProperty({
    format: 'uuid',
    example: 'ede238eb-faea-4738-ad8d-f2e50ef6eba5',
  })
  id!: string;

  @ApiProperty({
    example: 'Modern Duplex',
  })
  title!: string;

  @ApiProperty({
    example: 'Luxurious modern duplex located in a serene estate.',
  })
  description!: string;

  @ApiProperty({
    enum: ['SALE', 'RENT'],
    example: 'SALE',
  })
  purpose!: string;

  @ApiProperty({
    enum: ['APARTMENT', 'HOUSE', 'DUPLEX', 'LAND', 'COMMERCIAL'],
    example: 'DUPLEX',
  })
  propertyType!: string;

  @ApiProperty({
    example: '85000000.00',
  })
  price!: string;

  @ApiProperty({
    enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
    example: 'PUBLISHED',
  })
  listingStatus!: string;

  @ApiProperty({
    enum: ['AVAILABLE', 'SOLD', 'RENTED'],
    example: 'AVAILABLE',
  })
  availability!: string;

  @ApiPropertyOptional({
    example: 4,
  })
  bedrooms?: number | null;

  @ApiPropertyOptional({
    example: 5,
  })
  bathrooms?: number | null;

  @ApiPropertyOptional({
    example: 2,
  })
  parkingSpaces?: number | null;

  @ApiProperty({
    example: '12 Balogun Estate',
  })
  address!: string;

  @ApiProperty({
    example: 'Ikorodu',
  })
  city!: string;

  @ApiProperty({
    example: 'Lagos',
  })
  state!: string;

  @ApiProperty({
    example: 'Nigeria',
  })
  country!: string;

  @ApiPropertyOptional({
    example: 6.6194,
  })
  latitude?: number | null;

  @ApiPropertyOptional({
    example: 3.5105,
  })
  longitude?: number | null;

  @ApiProperty({
    type: [PropertyImageResponse],
  })
  images!: PropertyImageResponse[];

  @ApiProperty({
    type: UserResponse,
  })
  agent!: UserResponse;

  @ApiProperty({
    example: '2026-09-14T10:00:00.000Z',
  })
  createdAt!: string;

  @ApiProperty({
    example: '2026-09-14T10:00:00.000Z',
  })
  updatedAt!: string;
}

export class FavoriteResponse {
  @ApiProperty({
    format: 'uuid',
    example: 'a8a6c5a2-7f51-4d30-8a4f-1d3b4c5e6f70',
  })
  id!: string;

  @ApiProperty({
    format: 'uuid',
    example: 'ede238eb-faea-4738-ad8d-f2e50ef6eba5',
  })
  propertyId!: string;

  @ApiProperty({
    type: PropertyResponse,
  })
  property!: PropertyResponse;

  @ApiProperty({
    example: '2026-09-14T10:00:00.000Z',
  })
  createdAt!: string;
}

export class InquiryResponse {
  @ApiProperty({
    format: 'uuid',
    example: '0216ba3e-7dd1-4477-91fa-c5e6b6fe5202',
  })
  id!: string;

  @ApiProperty({
    format: 'uuid',
    example: 'ede238eb-faea-4738-ad8d-f2e50ef6eba5',
  })
  propertyId!: string;

  @ApiProperty({
    format: 'uuid',
    example: 'c132ab36-9430-4f31-ae1c-c00a575a7d56',
  })
  userId!: string;

  @ApiProperty({
    example:
      'Hello, I am interested in this property. I would like to schedule a viewing.',
  })
  message!: string;

  @ApiProperty({
    enum: ['PENDING', 'CONTACTED', 'CLOSED'],
    example: 'PENDING',
  })
  status!: string;

  @ApiProperty({
    type: PropertyResponse,
  })
  property!: PropertyResponse;

  @ApiProperty({
    type: UserResponse,
  })
  user!: UserResponse;

  @ApiProperty({
    example: '2026-09-14T10:00:00.000Z',
  })
  createdAt!: string;

  @ApiProperty({
    example: '2026-09-14T10:00:00.000Z',
  })
  updatedAt!: string;
}

export class AdminStatsResponse {
  @ApiProperty({
    example: {
      total: 4,
      agents: 1,
      admins: 1,
    },
  })
  users!: {
    total: number;
    agents: number;
    admins: number;
  };

  @ApiProperty({
    example: {
      total: 2,
      published: 1,
      draft: 1,
      archived: 0,
      available: 2,
      sold: 0,
      rented: 0,
    },
  })
  properties!: {
    total: number;
    published: number;
    draft: number;
    archived: number;
    available: number;
    sold: number;
    rented: number;
  };

  @ApiProperty({
    example: {
      pending: 1,
      contacted: 0,
      closed: 0,
      total: 1,
    },
  })
  inquiries!: {
    pending: number;
    contacted: number;
    closed: number;
    total: number;
  };
}
