import http from 'http';
import match from './endpoints/match';
import player from './endpoints/player';
import samples from './endpoints/samples';
import trophies from './endpoints/trophies';
import { parse } from 'url';

console.log(process.env.PSModulePath);
if (!process.env.PUBG_API_KEY) {
  throw new Error(`No process.env.PUBG_API_KEY set. Set env PUBG_API_KEY="xxx" first`);
}

const endpoints = {
  match,
  player,
  samples,
  trophies
};

const hostname = '127.0.0.1';
const port = 7000;
http
  .createServer(async (req, res) => {
    const { pathname } = parse(req.url);
    const endpoint = endpoints[pathname.substr(1)];
    if (!endpoint) {
      res.writeHead(400);
      res.end(`Unknown endpoint ${req.url}`);
      return;
    }

    return await endpoint(req, res);
  })
  .listen(port, hostname, () => {
    console.log('Trophy Hunter PUBG API is running!');

    Object.keys(endpoints).forEach(endpoint => {
      console.log(`http://${hostname}:${port}/${endpoint}`);
    });
  });
