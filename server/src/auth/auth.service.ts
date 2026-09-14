import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { createHash, randomBytes } from 'crypto';

import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const email = dto.email.trim().toLowerCase();

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      throw new ConflictException('An account with this email already exists');
    }

    const passwordHash = await argon2.hash(dto.password, {
      type: argon2.argon2id,
    });

    return this.prisma.user.create({
      data: {
        firstName: dto.firstName.trim(),
        lastName: dto.lastName.trim(),
        email,
        passwordHash,
        phone: dto.phone?.trim(),
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email.trim().toLowerCase(),
      },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordValid = await argon2.verify(user.passwordHash, password);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);

    const accessToken = await this.createAccessToken(user.id, user.role);

    const refreshToken = this.generateRefreshToken();

    await this.createRefreshSession(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: this.sanitizeUser(user),
    };
  }

  async refresh(refreshToken: string | undefined) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    const tokenHash = this.hashRefreshToken(refreshToken);

    const session = await this.prisma.refreshSession.findFirst({
      where: {
        tokenHash,
        revokedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        user: true,
      },
    });

    if (!session || !session.user.isActive) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // Rotate the refresh token.
    await this.prisma.refreshSession.update({
      where: {
        id: session.id,
      },
      data: {
        revokedAt: new Date(),
      },
    });

    const newRefreshToken = this.generateRefreshToken();

    await this.createRefreshSession(session.userId, newRefreshToken);

    const accessToken = await this.createAccessToken(
      session.user.id,
      session.user.role,
    );

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(refreshToken: string | undefined) {
    if (!refreshToken) {
      return;
    }

    const tokenHash = this.hashRefreshToken(refreshToken);

    await this.prisma.refreshSession.updateMany({
      where: {
        tokenHash,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }

  async getCurrentUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('User account is inactive');
    }

    return user;
  }

  private async createAccessToken(userId: string, role: string) {
    return this.jwtService.signAsync({
      sub: userId,
      role,
    });
  }

  private generateRefreshToken(): string {
    return randomBytes(64).toString('hex');
  }

  private hashRefreshToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private async createRefreshSession(userId: string, refreshToken: string) {
    const days = Number(
      this.configService.get<string>('JWT_REFRESH_EXPIRES_IN_DAYS') ?? 7,
    );

    const expiresAt = new Date();

    expiresAt.setDate(expiresAt.getDate() + days);

    await this.prisma.refreshSession.create({
      data: {
        userId,
        tokenHash: this.hashRefreshToken(refreshToken),
        expiresAt,
      },
    });
  }

  private sanitizeUser(user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    role: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

// import {
//   ConflictException,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import * as argon2 from 'argon2';

// import { PrismaService } from '../prisma/prisma.service';
// import { LoginDto } from './dto/login.dto';
// import { RegisterDto } from './dto/register.dto';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly prisma: PrismaService,
//     private readonly jwtService: JwtService,
//   ) {}

//   async register(dto: RegisterDto) {
//     const email = dto.email.trim().toLowerCase();

//     const existingUser = await this.prisma.user.findUnique({
//       where: { email },
//       select: { id: true },
//     });

//     if (existingUser) {
//       throw new ConflictException('An account with this email already exists');
//     }

//     const passwordHash = await argon2.hash(dto.password, {
//       type: argon2.argon2id,
//     });

//     const user = await this.prisma.user.create({
//       data: {
//         firstName: dto.firstName.trim(),
//         lastName: dto.lastName.trim(),
//         email,
//         passwordHash,
//         phone: dto.phone?.trim(),
//       },
//       select: {
//         id: true,
//         firstName: true,
//         lastName: true,
//         email: true,
//         phone: true,
//         role: true,
//         isActive: true,
//         createdAt: true,
//         updatedAt: true,
//       },
//     });

//     return user;
//   }

//   async validateUser(email: string, password: string) {
//     const user = await this.prisma.user.findUnique({
//       where: {
//         email: email.trim().toLowerCase(),
//       },
//     });

//     if (!user || !user.isActive) {
//       throw new UnauthorizedException('Invalid email or password');
//     }

//     const passwordValid = await argon2.verify(user.passwordHash, password);

//     if (!passwordValid) {
//       throw new UnauthorizedException('Invalid email or password');
//     }

//     return user;
//   }

//   async login(dto: LoginDto) {
//     const user = await this.validateUser(dto.email, dto.password);

//     const accessToken = await this.jwtService.signAsync({
//       sub: user.id,
//       role: user.role,
//     });

//     return {
//       accessToken,
//       user: {
//         id: user.id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         phone: user.phone,
//         role: user.role,
//       },
//     };
//   }
// }
