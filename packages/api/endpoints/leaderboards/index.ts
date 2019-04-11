import { IncomingMessage, ServerResponse } from 'http';
import { attributes } from '../../utilities/trophies';

export default async (_: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Cache-Control', 's-maxage=3600, max-age=3600');
  res.end(JSON.stringify(Object.values(attributes)));
};
