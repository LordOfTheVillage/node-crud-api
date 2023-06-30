import { ServerResponse } from 'http';
import { StatusCode } from '../constants/statusCode';

export const createErrorResponse = (
  res: ServerResponse,
  statusCode: number,
  message: string,
) => {
  res.statusCode = statusCode;
  res.end(JSON.stringify({ statusCode, message }));
};

export const createSuccessResponse = (res: ServerResponse, data: unknown) => {
  res.statusCode = StatusCode.OK;
  res.end(JSON.stringify(data));
};
