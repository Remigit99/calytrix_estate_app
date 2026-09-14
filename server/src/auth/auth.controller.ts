import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { CurrentUser, type JwtUser } from './decorators/current-user.decorator';
import { ApiTags } from '@nestjs/swagger';

// type AuthenticatedRequest = Request & {
//   user: {
//     id: string;
//   };
// };
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(dto);

    this.setRefreshCookie(response, result.refreshToken);

    return {
      accessToken: result.accessToken,
      user: result.user,
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies?.refreshToken as string | undefined;

    const result = await this.authService.refresh(refreshToken);

    this.setRefreshCookie(response, result.refreshToken);

    return {
      accessToken: result.accessToken,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies?.refreshToken as string | undefined;

    await this.authService.logout(refreshToken);

    response.clearCookie('refreshToken', this.refreshCookieOptions());

    return;
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUser() user: JwtUser) {
    return this.authService.getCurrentUser(user.id);
  }

  private setRefreshCookie(response: Response, refreshToken: string) {
    response.cookie('refreshToken', refreshToken, this.refreshCookieOptions());
  }

  private refreshCookieOptions() {
    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';

    return {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax' as const,
      path: '/api/v1/auth',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
  }
}

// import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

// import { AuthService } from './auth.service';
// import { LoginDto } from './dto/login.dto';
// import { RegisterDto } from './dto/register.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('register')
//   @HttpCode(HttpStatus.CREATED)
//   register(@Body() dto: RegisterDto) {
//     return this.authService.register(dto);
//   }

//   @Post('login')
//   @HttpCode(HttpStatus.OK)
//   login(@Body() dto: LoginDto) {
//     return this.authService.login(dto);
//   }
// }
