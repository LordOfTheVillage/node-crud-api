import { createServer } from 'http';
import { POST } from './modules/POST';
import { GET } from './modules/GET';
import { Methods } from './constants/methods';
import { Endpoints, EndpointsSeparator } from './constants/endpoints';
import { createErrorResponse } from './utils/utils';
import { StatusCode } from './constants/statusCode';
import { ErrorMessages } from './constants/errorMessages';

const server = createServer((req, res) => {
  const { method, url } = req;

  if (!url) {
    createErrorResponse(res, StatusCode.BAD_REQUEST, ErrorMessages.INVALID_URL);
    return;
  }

  res.setHeader('Content-Type', 'application/json');

  if (method === Methods.GET && url.startsWith(Endpoints.USERS)) {
    const index = Endpoints.USERS.split(EndpointsSeparator).length;
    const userId = url.split(EndpointsSeparator)[index];

    GET(req, res, userId);
  }

  if (method === Methods.POST && url === Endpoints.USERS) {
    POST(req, res);
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
