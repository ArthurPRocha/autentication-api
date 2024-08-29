import {
  createParamDecorator,
  ExecutionContext,
  ParseUUIDPipe,
} from '@nestjs/common';

export const ParamId = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const id: ParseUUIDPipe = context.switchToHttp().getRequest().params.id;

    return id;
  },
);
