import {
  IsDecimal,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  Min,
} from 'class-validator';

import {
  Availability,
  PropertyType,
  Purpose,
} from '../../generated/prisma/enums';

export class UpdatePropertyDto {
  @IsOptional()
  @IsString()
  @Length(5, 150)
  title?: string;

  @IsOptional()
  @IsString()
  @Length(20, 5000)
  description?: string;

  @IsOptional()
  @IsDecimal()
  price?: string;

  @IsOptional()
  @IsEnum(Purpose)
  purpose?: Purpose;

  @IsOptional()
  @IsEnum(PropertyType)
  propertyType?: PropertyType;

  @IsOptional()
  @IsEnum(Availability)
  availability?: Availability;

  @IsOptional()
  @IsInt()
  @Min(0)
  bedrooms?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  bathrooms?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  parkingSpaces?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  state?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;

  @IsOptional()
  @IsDecimal()
  latitude?: string;

  @IsOptional()
  @IsDecimal()
  longitude?: string;
}
