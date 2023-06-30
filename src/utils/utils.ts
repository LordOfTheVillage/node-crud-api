import { ServerResponse } from 'http';

export const createErrorResponse = (
  res: ServerResponse,
  statusCode: number,
  message: string,
) => {
  res.statusCode = statusCode;
  res.end(JSON.stringify({ statusCode, message }));
};

export const createSuccessResponse = (
  res: ServerResponse,
  statusCode: number,
  data: unknown,
) => {
  res.statusCode = statusCode;
  res.end(JSON.stringify(data));
};

export const checkUserData = (
  username: unknown,
  age: unknown,
  hobbies: unknown,
) => {
  return (
    !username ||
    !age ||
    !hobbies ||
    typeof username !== 'string' ||
    typeof age !== 'number' ||
    !Array.isArray(hobbies)
  );
};
