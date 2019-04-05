import { IncomingMessage, ServerResponse } from 'http';
import { getNormalizedTrophies } from '../../utilities/trophies';

export default async (_: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Cache-Control', 's-maxage=31536000, maxage=0');
  res.end(JSON.stringify(getNormalizedTrophies()));
};
