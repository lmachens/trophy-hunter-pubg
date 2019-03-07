import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import getPlayer from '../../utilities/pubg-api/players';

export default async (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  const { platform, playerName } = parse(req.url!, true).query;
  if (!platform || typeof platform !== 'string' || !playerName || typeof playerName !== 'string') {
    res.writeHead(400);
    return res.end('Invalid query');
  }

  res.setHeader('Cache-Control', 's-maxage=31536000, maxage=0');

  try {
    const result = await getPlayer({ platform, playerName });
    const player = {
      name: playerName,
      platform,
      matches: result.relationships.matches.data
    };

    res.end(JSON.stringify(player));
  } catch (error) {
    console.error(error.message);
    res.writeHead(error.response.status);
    res.end(error.response.statusText);
  }
};
