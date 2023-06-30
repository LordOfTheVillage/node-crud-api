import { createServer } from 'http';
import { POST } from './modules/POST';
import { GET } from './modules/GET';

const server = createServer((req, res) => {
  const { method, url } = req;

  res.setHeader('Content-Type', 'application/json');

  if (method === 'GET' && url === '/api/users') {
    GET(req, res);
  }

  if (method === 'POST' && url === '/api/users') {
    POST(req, res);
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
