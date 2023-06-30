import { users } from '../../server/database';
import { IncomingMessage, ServerResponse } from 'http';

export const GET = (req: IncomingMessage, res: ServerResponse) => {
  res.statusCode = 200;
  res.end(JSON.stringify(users));
};
