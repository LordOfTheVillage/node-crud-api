import { IncomingMessage, ServerResponse } from 'http';
import { validate as validateUUID } from 'uuid';
import { createErrorResponse, createSuccessResponse } from '../utils/utils';
import { StatusCode } from '../constants/statusCode';
import { ErrorMessages } from '../constants/errorMessages';
import { deleteUser } from '../../server/data';

type DELETE = (
  req: IncomingMessage,
  res: ServerResponse,
  userId?: string | null,
) => void;

// @ts-ignore
export const DELETE: DELETE = (req, res, userId = null) => {
  try {
    if (!userId || !validateUUID(userId)) {
      createErrorResponse(
        res,
        StatusCode.BAD_REQUEST,
        ErrorMessages.INVALID_USER_ID,
      );
      return;
    }

    const deletedUser = deleteUser(userId);

    if (!deletedUser) {
      createErrorResponse(
        res,
        StatusCode.NOT_FOUND,
        ErrorMessages.USER_NOT_FOUND,
      );
      return;
    }

    createSuccessResponse(res, StatusCode.NO_CONTENT, '');
  } catch (error) {
    createErrorResponse(
      res,
      StatusCode.INTERNAL_SERVER_ERROR,
      (error as Error).message,
    );
  }
};
