import getPUBGApi from '../getPUBGApi';
import SeasonStats from './interface';

interface GetSeasonStatsProps {
  platform: string;
  accountId: string;
  seasonId: string;
}

const mapMatch = (match: { type: 'match'; id: string }) => match.id;

const getSeasonStats = ({ platform, accountId, seasonId }: GetSeasonStatsProps) => {
  return getPUBGApi<SeasonStats>({
    platform,
    endpoint: `players/${accountId}/seasons/${seasonId}`
  }).then(seasonStats => ({
    gameModeStats: seasonStats.data.attributes.gameModeStats,
    matchesSolo: seasonStats.data.relationships.matchesSolo.data.map(mapMatch),
    matchesSoloFPP: seasonStats.data.relationships.matchesSoloFPP.data.map(mapMatch),
    matchesDuo: seasonStats.data.relationships.matchesDuo.data.map(mapMatch),
    matchesDuoFPP: seasonStats.data.relationships.matchesDuoFPP.data.map(mapMatch),
    matchesSquad: seasonStats.data.relationships.matchesSquad.data.map(mapMatch),
    matchesSquadFPP: seasonStats.data.relationships.matchesSquadFPP.data.map(mapMatch)
  }));
};

export default getSeasonStats;
