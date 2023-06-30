import { createServer } from 'http';
import { users } from '../server/database';

const server = createServer((req, res) => {
  const { method, url } = req;

  res.setHeader('Content-Type', 'application/json');

  if (method === 'GET' && url === '/api/users') {
    res.statusCode = 200;
    res.end(JSON.stringify(users));
  }
});


const port = 3000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});