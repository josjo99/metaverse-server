/* eslint-disable no-underscore-dangle */
import express from 'express';
import cors from 'cors';
import http from 'http';
import SocketServer from './websockets'

const app = express();

app.use(cors());

let port = 9000;
let server = null;
server = http.createServer(app);

const socket = SocketServer(server);

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Metareality space server is listening to port ${port}!`);
});
