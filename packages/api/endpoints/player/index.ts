import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import getPlayer from '../../utilities/pubg-api/players';

export default async (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  const { platform, playerName, playerId } = parse(req.url!, true).query;
  if (
    typeof platform !== 'string' ||
    ((typeof playerName !== 'string' && typeof playerId !== 'string') ||
      Array.isArray(playerName) ||
      Array.isArray(playerId))
  ) {
    res.writeHead(400);
    return res.end('Invalid query');
  }

  try {
    const result = await getPlayer({ platform, playerName, playerId });
    const player = {
      id: result.id,
      name: result.attributes.name,
      platform,
      matches: result.relationships.matches.data.map(match => match.id)
    };

    res.setHeader('Cache-Control', 's-maxage=3600, maxage=0');
    res.end(JSON.stringify(player));
  } catch (error) {
    res.setHeader('Cache-Control', 'max-age=600, s-maxage=60, maxage=0');
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
