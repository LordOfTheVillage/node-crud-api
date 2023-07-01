import 'dotenv/config';
import os from 'os';
import { server } from '../app';
import { createServer, Server } from 'http';

const port = Number(process.env.PORT) || 5000;
const numWorkers = os.cpus().length - 1;
const workers: Server[] = [];

for (let i = 0; i < numWorkers; i++) {
  const worker = createServer((req, res) => {
    server.emit('request', req, res);
  });

  worker.listen(port + 1 + i, () => {
    console.log(
      `Worker ${i + 1} listening on http://localhost:${port + 1 + i}`,
    );
  });

  workers.push(worker);
}

const loadBalancer = createServer((req, res) => {
  const nextWorker = workers.shift();
  workers.push(nextWorker as Server);

  nextWorker?.emit('request', req, res);
});
loadBalancer.listen(port, () => {
  console.log(`Load balancer listening on http://localhost:${port}`);
});
