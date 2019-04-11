import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import getMatch from '../../utilities/pubg-api/match';
import { getParticipant, getParticipantCount, getGeneralStats } from '../../utilities/match';
// import getTeam from '../../utilities/match/getTeam';
import { calculateTrophies } from '../../utilities/trophies';

export default async (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  const { platform, matchId, playerId } = parse(req.url!, true).query;
  if (typeof platform !== 'string' || typeof matchId !== 'string' || typeof playerId !== 'string') {
    res.writeHead(400);
    return res.end('Invalid query');
  }

  try {
    const match = await getMatch({ platform, matchId });
    const participant = getParticipant({ match, playerId });
    // const team = getTeam({ match, participant });
    const { name: playerName, ...playerStats } = participant.attributes.stats;
    delete playerStats.playerId;
    const participantCount = getParticipantCount({ match });
    const { avgStats, maxStats, minStats } = getGeneralStats({ playerStats, match });
    const trophyNames = calculateTrophies({ playerStats, avgStats, maxStats, minStats });
    const result = {
      platform,
      matchId,
      playerId,
      playerName,
      trophyNames,
      playerStats,
      avgStats,
      maxStats,
      minStats,
      createdAt: match.data.attributes.createdAt,
      duration: match.data.attributes.duration,
      mapName: match.data.attributes.mapName,
      participantCount
    };
    res.setHeader('Cache-Control', 's-maxage=31536000, max-age=86400');
    res.end(JSON.stringify(result));
  } catch (error) {
    res.setHeader('Cache-Control', 's-maxage=3600, max-age=3600');
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
