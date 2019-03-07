import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import getSamples from '../../utilities/pubg-api/samples';

export default async (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  const { platform } = parse(req.url!, true).query;
  if (!platform || typeof platform !== 'string') {
    res.writeHead(400);
    return res.end('Invalid query');
  }

  res.setHeader('Cache-Control', 's-maxage=31536000, maxage=0');

  try {
    const result = await getSamples({ platform });
    res.end(JSON.stringify(result));
  } catch (error) {
    console.error(error.message);
    res.writeHead(error.response.status);
    res.end(error.response.statusText);
  }
};
