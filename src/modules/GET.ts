import { IncomingMessage, ServerResponse } from 'http';
import { validate as validateUUID } from 'uuid';
import { createErrorResponse, createSuccessResponse } from '../utils/utils';
import { StatusCode } from '../constants/statusCode';
import { ErrorMessages } from '../constants/errorMessages';
import { users } from '../../server/database';

type GET = (
  req: IncomingMessage,
  res: ServerResponse,
  userId?: string | null,
) => void;

// @ts-ignore
export const GET: GET = (req, res, userId = null) => {
  try {
    if (!userId) {
      createSuccessResponse(res, StatusCode.OK, users);
      return;
    }

    if (!validateUUID(userId)) {
      createErrorResponse(
        res,
        StatusCode.BAD_REQUEST,
        ErrorMessages.INVALID_USER_ID,
      );
      return;
    }

    const user = users.find((user) => user.id === userId);

    if (!user) {
      createErrorResponse(
        res,
        StatusCode.NOT_FOUND,
        ErrorMessages.USER_NOT_FOUND,
      );
      return;
    }

    createSuccessResponse(res, StatusCode.OK, user);
  } catch (error) {
    createErrorResponse(
      res,
      StatusCode.INTERNAL_SERVER_ERROR,
      (error as Error).message,
    );
  }
};
