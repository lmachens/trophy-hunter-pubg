import compression from 'compression';
import express from 'express';
import match from './endpoints/match';
import player from './endpoints/player';
import trophies from './endpoints/trophies';
import attributes from './endpoints/attributes';
import gameIcons from './endpoints/game-icons';
import seasons from './endpoints/seasons';
import seasonStats from './endpoints/season-stats';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env'
});

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

const port = 7000;
const app = express();
app.use(compression());

app.get('/', (_req, res) => {
  res.writeHead(200);
  res.end('Trophy Hunter PUBG API');
});

Object.entries(endpoints).forEach(([route, handle]) => {
  app.get(`/${route}`, handle);
  console.log(`http://127.0.0.1:${port}/${route}`);
});

app.get('/favicon.ico', (_req, res) => {
  res.writeHead(204);
  return res.end();
});

app.listen(port, () => {
  console.log('Trophy Hunter PUBG API is running!');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('Version:', process.version);
});
