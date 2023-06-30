import { addUser } from '../../server/database';
import { IncomingMessage, ServerResponse } from 'http';
import { createErrorResponse, createSuccessResponse } from '../utils/utils';
import { StatusCode } from '../constants/statusCode';
import { ErrorMessages } from '../constants/errorMessages';

type POST = (req: IncomingMessage, res: ServerResponse) => void;
export const POST: POST = (req, res) => {
  try {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const { username, age, hobbies } = JSON.parse(body);

      if (
        !username ||
        !age ||
        !hobbies ||
        typeof username !== 'string' ||
        typeof age !== 'number' ||
        !Array.isArray(hobbies)
      ) {
        createErrorResponse(
          res,
          StatusCode.BAD_REQUEST,
          ErrorMessages.USERNAME_AGE_HOBBIES_REQUIRED,
        );
        return;
      }

      const newUser = addUser(username, age, hobbies);
      createSuccessResponse(res, StatusCode.CREATED, newUser);
    });
  } catch (error) {
    createErrorResponse(
      res,
      StatusCode.INTERNAL_SERVER_ERROR,
      (error as Error).message,
    );
  }
};
