import { IncomingMessage, ServerResponse } from 'http';
import attributes from '../../utilities/attributes';

export default async (_: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Cache-Control', 's-maxage=31536000, max-age=86400');
  res.end(JSON.stringify(Object.values(attributes)));
};
