import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ApiErrorResponse } from './schemas';

export const ApiSuccessResponse = (options?: {
  type?: any;
  description?: string;
}) =>
  ApiOkResponse({
    description: options?.description ?? 'Request successful',
    type: options?.type,
  });

export const ApiCreatedSuccessResponse = (options?: {
  type?: any;
  description?: string;
}) =>
  ApiCreatedResponse({
    description: options?.description ?? 'Resource created successfully',
    type: options?.type,
  });

export const ApiNoContentSuccessResponse = (
  description = 'Request successful',
) =>
  ApiNoContentResponse({
    description,
  });

export const ApiCommonErrors = () =>
  applyDecorators(
    ApiBadRequestResponse({
      description: 'Invalid request or validation failed',
      type: ApiErrorResponse,
    }),

    ApiUnauthorizedResponse({
      description: 'Authentication required or token is invalid',
      type: ApiErrorResponse,
    }),

    ApiForbiddenResponse({
      description: 'You do not have permission to perform this action',
      type: ApiErrorResponse,
    }),

    ApiNotFoundResponse({
      description: 'Requested resource was not found',
      type: ApiErrorResponse,
    }),

    ApiConflictResponse({
      description: 'Request conflicts with the current resource state',
      type: ApiErrorResponse,
    }),

    ApiTooManyRequestsResponse({
      description: 'Too many requests',
      type: ApiErrorResponse,
    }),

    ApiInternalServerErrorResponse({
      description: 'Unexpected server error',
      type: ApiErrorResponse,
    }),
  );
