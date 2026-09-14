import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  CurrentUser,
  type JwtUser,
} from '../auth/decorators/current-user.decorator';

import { FavoritesService } from './favorites.service';
import { PaginationDto } from 'src/common/pagination/pagination.dto';

@Controller()
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  // @Get('users/me/favorites')
  // getUserFavorites(@CurrentUser() user: JwtUser) {
  //   return this.favoritesService.getUserFavorites(user.id);
  // }

  @Get('users/me/favorites')
  getUserFavorites(
    @CurrentUser() user: JwtUser,
    @Query() query: PaginationDto,
  ) {
    return this.favoritesService.getUserFavorites(user.id, query);
  }

  @Post('properties/:propertyId/favorite')
  addFavorite(
    @CurrentUser() user: JwtUser,
    @Param('propertyId') propertyId: string,
  ) {
    return this.favoritesService.addFavorite(user.id, propertyId);
  }

  @Delete('properties/:propertyId/favorite')
  removeFavorite(
    @CurrentUser() user: JwtUser,
    @Param('propertyId') propertyId: string,
  ) {
    return this.favoritesService.removeFavorite(user.id, propertyId);
  }
}
