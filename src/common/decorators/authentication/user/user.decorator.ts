import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsersEntityRequest } from '../../../../models/users/serializers/users.serializer';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UsersEntityRequest => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
