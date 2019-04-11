import http from 'http';
import match from './endpoints/match';
import player from './endpoints/player';
import trophies from './endpoints/trophies';
import attributes from './endpoints/attributes';
import gameIcons from './endpoints/game-icons';
import seasons from './endpoints/seasons';
import seasonStats from './endpoints/season-stats';
import { parse } from 'url';

if (!process.env.PUBG_API_KEY) {
  throw new Error(`No process.env.PUBG_API_KEY set. Set env PUBG_API_KEY="xxx" first`);
}

interface Endpoints {
  [key: string]: any;
}

const endpoints: Endpoints = {
  match,
  player,
  trophies,
  attributes,
  'game-icons': gameIcons,
  seasons,
  'season-stats': seasonStats
};

const hostname = 'localhost';
const port = 7000;
http
  .createServer(async (req, res) => {
    if (req.url === '/favicon.ico') {
      res.writeHead(204);
      return res.end();
    }
    console.log(new Date(), req.url);
    const { pathname = '' } = parse(req.url!);
    const endpointName = pathname.substr(1);
    const endpoint = endpoints[endpointName];
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
