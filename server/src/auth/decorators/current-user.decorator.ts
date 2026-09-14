import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Role } from '../../generated/prisma/enums';

export type JwtUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  role: Role;
  isActive: boolean;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): JwtUser => {
    const request = context.switchToHttp().getRequest<{ user: JwtUser }>();

    return request.user;
  },
);
