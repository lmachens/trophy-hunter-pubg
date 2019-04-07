import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import getSeasonStats from '../../utilities/pubg-api/seasonStats';
import getMatch from '../../utilities/pubg-api/match';
import { getParticipant, getGeneralStats } from '../../utilities/match';
// import getTeam from '../../utilities/match/getTeam';
import { calculateTrophies } from '../../utilities/trophies';
import getSeasons from '../../utilities/pubg-api/seasons';
import { GameModeStats } from 'utilities/pubg-api/seasonStats/interface';

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

  try {
    let season = seasonId;
    if (typeof season !== 'string') {
      const seasons = await getSeasons({ platform });
      const currentSeason = seasons.find(season => season.isCurrentSeason);
      season = currentSeason!.id;
    }

    const seasonStats = await getSeasonStats({ platform, playerId, seasonId: season });

    const matchIds = [
      ...seasonStats.matchesSolo,
      ...seasonStats.matchesSoloFPP,
      ...seasonStats.matchesDuo,
      ...seasonStats.matchesDuoFPP,
      ...seasonStats.matchesSquad,
      ...seasonStats.matchesSquadFPP
    ];
    const matches = await Promise.all(matchIds.map(matchId => getMatch({ platform, matchId })));

    Object.values(seasonStats.gameModeStats).forEach(gameModeStats => {
      gameModeStats.roundsAnalysed = 0;
      gameModeStats.avgRank = 0;
    });
    const { trophies } = matches.reduce<{
      trophies: Trophies;
    }>(
      (res, match) => {
        const participant = getParticipant({ match, playerId });
        // const team = getTeam({ match, participant });
        const playerStats = participant.attributes.stats;
        const { avgStats, maxStats, minStats } = getGeneralStats({ playerStats, match });
        const trophyNames = calculateTrophies({ playerStats, avgStats, maxStats, minStats });

        const trophies = { ...res.trophies };
        trophyNames.forEach(trophy => {
          trophies[trophy] = trophies[trophy] ? trophies[trophy] + 1 : 1;
        });
        if (match.data.attributes.gameMode in seasonStats.gameModeStats) {
          // @ts-ignore
          const gameModeStats = seasonStats.gameModeStats[
            match.data.attributes.gameMode
          ] as GameModeStats;
          gameModeStats.roundsAnalysed++;
          gameModeStats.avgRank += playerStats.winPlace;
        }

        return {
          trophies
        };
      },
      {
        trophies: {}
      }
    );
    Object.values(seasonStats.gameModeStats).forEach(gameModeStats => {
      gameModeStats.avgRank = gameModeStats.avgRank / gameModeStats.roundsAnalysed || 0;
    });

    const result = {
      trophies,
      gameModeStats: seasonStats.gameModeStats
    };
    res.setHeader('Cache-Control', 's-maxage=3600, maxage=0');
    res.end(JSON.stringify(result));
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
