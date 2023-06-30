import { createServer } from 'http';
import { GET } from './modules/GET';
import { POST } from './modules/POST';
import { PUT } from './modules/PUT';
import { DELETE } from './modules/DELETE';
import { Methods } from './constants/methods';
import { Endpoints, EndpointsSeparator } from './constants/endpoints';
import { checkUrl, createErrorResponse } from './utils/utils';
import { StatusCode } from './constants/statusCode';
import { ErrorMessages } from './constants/errorMessages';
import 'dotenv/config';

export const server = createServer((req, res) => {
  const { method, url } = req;

  if (!url || !checkUrl(url, Endpoints.USERS)) {
    createErrorResponse(res, StatusCode.NOT_FOUND, ErrorMessages.INVALID_URL);
    return;
  }

  res.setHeader('Content-Type', 'application/json');
  const index = Endpoints.USERS.split(EndpointsSeparator).length;
  const userId = url.split(EndpointsSeparator)[index];

  switch (method) {
    case Methods.GET:
      GET(req, res, userId);
      break;
    case Methods.POST:
      if (userId) {
        return createErrorResponse(
          res,
          StatusCode.BAD_REQUEST,
          ErrorMessages.INVALID_URL,
        );
      }
      POST(req, res);
      break;
    case Methods.PUT:
      PUT(req, res, userId);
      break;
    case Methods.DELETE:
      DELETE(req, res, userId);
      break;
    default:
      createErrorResponse(
        res,
        StatusCode.NOT_FOUND,
        ErrorMessages.INVALID_METHOD,
      );
  }
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
