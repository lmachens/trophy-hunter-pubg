import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import getMatch from '../../utilities/pubg-api/match';
import { getParticipant, getParticipantCount } from '../../utilities/match';
// import getTeam from '../../utilities/match/getTeam';
import { getTrophies } from '../../utilities/trophies';

export default async (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  const { platform, matchId, playerId } = parse(req.url!, true).query;
  if (typeof platform !== 'string' || typeof matchId !== 'string' || typeof playerId !== 'string') {
    res.writeHead(400);
    return res.end('Invalid query');
  }

  res.setHeader('Cache-Control', 's-maxage=31536000, maxage=0');

  try {
    const match = await getMatch({ platform, matchId });
    const participant = getParticipant({ match, playerId });
    // const team = getTeam({ match, participant });
    const participantStats = participant.attributes.stats;
    const trophies = getTrophies({ participantStats });
    const participantCount = getParticipantCount({ match });
    const result = {
      platform,
      matchId,
      playerId,
      trophies,
      stats: participantStats,
      createdAt: match.data.attributes.createdAt,
      duration: match.data.attributes.duration,
      mapName: match.data.attributes.mapName,
      participantCount
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
