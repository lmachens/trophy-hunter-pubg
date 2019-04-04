import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import getSeasons from '../../utilities/pubg-api/seasons';

export default async (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  const { platform } = parse(req.url!, true).query;
  if (typeof platform !== 'string') {
    res.writeHead(400);
    return res.end('Invalid query');
  }

  res.setHeader('Cache-Control', 's-maxage=31536000, maxage=60');

  try {
    const result = await getSeasons({ platform });
    res.end(JSON.stringify(result));
  } catch (error) {
    console.error(error.message);
    if (!error.response) {
      error.response = {
        status: 400,
        statusText: 'Internal error'
      };
    }
    res.writeHead(error.response.status);
    res.end(error.response.statusText);
  }
};
