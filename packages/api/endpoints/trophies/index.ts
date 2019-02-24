import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import getMatch from '../../utilities/pubg-api/match';
import { getParticipant } from '../../utilities/match';
import getTeam from '../../utilities/match/getTeam';
import { getTrophies } from '../../utilities/trophies';

export default async (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  const { platform, matchId, playerName } = parse(req.url, true).query;
  if (
    !platform ||
    typeof platform !== 'string' ||
    !matchId ||
    typeof matchId !== 'string' ||
    !playerName ||
    typeof playerName !== 'string'
  ) {
    res.writeHead(400);
    return res.end('Invalid query');
  }

  res.setHeader('Cache-Control', 's-maxage=31536000, maxage=0');

  try {
    const match = await getMatch({ platform, matchId });
    const participant = getParticipant({ match, playerName });
    const team = getTeam({ match, participant });
    const participantStats = participant.attributes.stats;
    const trophies = getTrophies({ participantStats });
    const result = {
      trophies,
      participantStats,
      team
    };
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
