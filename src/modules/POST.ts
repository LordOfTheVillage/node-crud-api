import { v4 as uuidv4 } from 'uuid';
import { users } from '../../server/database';
import { IncomingMessage, ServerResponse } from 'http';

export const POST = (req: IncomingMessage, res: ServerResponse) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const { username, age, hobbies } = JSON.parse(body);

    if (!username || !age) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Username and age are required.' }));
      return;
    }

    const newUser = {
      id: uuidv4(),
      username,
      age,
      hobbies: hobbies || [],
    };

    users.push(newUser);

    res.statusCode = 201;
    res.end(JSON.stringify(newUser));
  });
};
