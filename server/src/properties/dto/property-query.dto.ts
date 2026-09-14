import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
  // Validate,
  // ValidatorConstraint,
  // ValidatorConstraintInterface,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { PropertyType, Purpose } from '../../generated/prisma/enums';

export enum PropertySortBy {
  PRICE = 'price',
  CREATED_AT = 'createdAt',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class PropertyQueryDto {
  @ApiPropertyOptional({
    example: 'Abuja',
    description: 'Filter properties by city',
  })
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({
    enum: Purpose,
    example: Purpose.SALE,
  })
  @IsOptional()
  @IsEnum(Purpose)
  purpose?: Purpose;

  @ApiPropertyOptional({
    enum: PropertyType,
    example: PropertyType.DUPLEX,
  })
  @IsOptional()
  @IsEnum(PropertyType)
  propertyType?: PropertyType;

  @ApiPropertyOptional({
    example: 4,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  bedrooms?: number;

  @ApiPropertyOptional({
    example: '50000000',
    description: 'Minimum property price',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d+(\.\d{1,2})?$/)
  minPrice?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d+(\.\d{1,2})?$/)
  maxPrice?: string;

  @IsOptional()
  @IsEnum(PropertySortBy)
  sortBy?: PropertySortBy;

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 12;
}
