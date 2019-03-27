import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import getSeasonStats from '../../utilities/pubg-api/seasonStats';
import getMatch from '../../utilities/pubg-api/match';
import { getParticipant, getGeneralStats } from '../../utilities/match';
// import getTeam from '../../utilities/match/getTeam';
import { calculateTrophies } from '../../utilities/trophies';
import getSeasons from '../../utilities/pubg-api/seasons';

interface Trophies {
  [trophyName: string]: number;
}

export default async (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  const { platform, playerId, seasonId } = parse(req.url!, true).query;
  if (typeof platform !== 'string' || typeof playerId !== 'string') {
    res.writeHead(400);
    return res.end('Invalid query');
  }

  res.setHeader('Cache-Control', 's-maxage=6000, maxage=0');

  try {
    let season = seasonId;
    if (typeof season !== 'string') {
      const seasons = await getSeasons({ platform });
      const currentSeason = seasons.find(season => season.isCurrentSeason);
      season = currentSeason!.id;
    }

    const seasonStats = await getSeasonStats({ platform, playerId, seasonId: season });

    const matches = [
      ...seasonStats.matchesSolo,
      ...seasonStats.matchesSoloFPP,
      ...seasonStats.matchesDuo,
      ...seasonStats.matchesDuoFPP,
      ...seasonStats.matchesSquad,
      ...seasonStats.matchesSquadFPP
    ];
    const trophiesByMatch = await Promise.all(
      matches.map(async matchId => {
        const match = await getMatch({ platform, matchId });
        const participant = getParticipant({ match, playerId });
        // const team = getTeam({ match, participant });
        const playerStats = participant.attributes.stats;
        const { avgStats, maxStats, minStats } = getGeneralStats({ playerStats, match });
        const trophyNames = calculateTrophies({ playerStats, avgStats, maxStats, minStats });
        return trophyNames;
      })
    );

    const trophies = trophiesByMatch.reduce<Trophies>((res, cur) => {
      const trophies = { ...res };
      cur.forEach(trophy => {
        trophies[trophy] = trophies[trophy] ? trophies[trophy] + 1 : 1;
      });
      return trophies;
    }, {});

    const result = {
      trophies,
      matchesCount: matches.length,
      ...seasonStats
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
