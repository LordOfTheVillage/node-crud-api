import { IncomingMessage, ServerResponse } from 'http';
import {
  checkUserData,
  createErrorResponse,
  createSuccessResponse,
} from '../utils/utils';
import { StatusCode } from '../constants/statusCode';
import { ErrorMessages } from '../constants/errorMessages';
import { updateUser } from '../../server/data';
import { validate as validateUUID } from 'uuid';

type PUT = (
  req: IncomingMessage,
  res: ServerResponse,
  userId?: string | null,
) => void;

export const PUT: PUT = (req, res, userId = null) => {
  try {
    if (!userId || !validateUUID(userId)) {
      createErrorResponse(
        res,
        StatusCode.BAD_REQUEST,
        ErrorMessages.INVALID_USER_ID,
      );
      return;
    }

    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const { username, age, hobbies } = JSON.parse(body);

      if (checkUserData(username, age, hobbies)) {
        createErrorResponse(
          res,
          StatusCode.BAD_REQUEST,
          ErrorMessages.USERNAME_AGE_HOBBIES_REQUIRED,
        );
        return;
      }

      const userToUpdate = updateUser(userId, username, age, hobbies);

      if (!userToUpdate) {
        createErrorResponse(
          res,
          StatusCode.NOT_FOUND,
          ErrorMessages.USER_NOT_FOUND,
        );
        return;
      }

      createSuccessResponse(res, StatusCode.OK, userToUpdate);
    });
  } catch (error) {
    createErrorResponse(
      res,
      StatusCode.INTERNAL_SERVER_ERROR,
      (error as Error).message,
    );
  }
};
