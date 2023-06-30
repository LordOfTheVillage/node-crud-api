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

export const checkUrl = (url: string, template: string) => {
  let workUrl = url;
  if (workUrl[workUrl.length - 1] === '/') {
    workUrl = workUrl.slice(0, workUrl.length - 1);
  }
  const urlParts = workUrl.split('/');
  const templateParts = template.split('/');

  for (let i = 0; i < templateParts.length; i++) {
    if (urlParts[i] !== templateParts[i]) {
      return false;
    }
  }

  return true;
};
