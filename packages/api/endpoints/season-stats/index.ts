import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import getSeasonStats from '../../utilities/pubg-api/seasonStats';

export default async (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  const { platform, accountId, seasonId } = parse(req.url!, true).query;
  if (
    typeof platform !== 'string' ||
    typeof accountId !== 'string' ||
    typeof seasonId !== 'string'
  ) {
    res.writeHead(400);
    return res.end('Invalid query');
  }

  res.setHeader('Cache-Control', 's-maxage=6000, maxage=0');

  try {
    const result = await getSeasonStats({ platform, accountId, seasonId });

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
