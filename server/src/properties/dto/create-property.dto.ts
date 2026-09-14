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

export class CreatePropertyDto {
  @IsString()
  @Length(5, 150)
  title!: string;

  @IsString()
  @Length(20, 5000)
  description!: string;

  @IsDecimal()
  price!: string;

  @IsEnum(Purpose)
  purpose!: Purpose;

  @IsEnum(PropertyType)
  propertyType!: PropertyType;

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

  @IsString()
  @MaxLength(255)
  address!: string;

  @IsString()
  @MaxLength(100)
  city!: string;

  @IsString()
  @MaxLength(100)
  state!: string;

  @IsString()
  @MaxLength(100)
  country!: string;

  @IsOptional()
  @IsDecimal()
  latitude?: string;

  @IsOptional()
  @IsDecimal()
  longitude?: string;
}
