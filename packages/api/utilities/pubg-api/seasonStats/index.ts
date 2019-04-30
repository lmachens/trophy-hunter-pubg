import getPUBGApi from '../getPUBGApi';
import SeasonStats, { PlayerSeasonStats } from './interface';

interface GetSeasonStatsProps {
  platform: string;
  playerId: string;
  seasonId: string;
}

const mapMatch = (match: { type: 'match'; id: string }) => match.id;

const getSeasonStats = ({
  platform,
  playerId,
  seasonId
}: GetSeasonStatsProps): Promise<PlayerSeasonStats> => {
  return getPUBGApi<SeasonStats>({
    platform,
    endpoint: `players/${playerId}/seasons/${seasonId}`
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

export const emptyGameModeStats = {
  assists: 0,
  bestRankPoint: 0,
  boosts: 0,
  dBNOs: 0,
  dailyKills: 0,
  dailyWins: 0,
  damageDealt: 0,
  days: 0,
  headshotKills: 0,
  heals: 0,
  killPoints: 0,
  kills: 0,
  longestKill: 0,
  longestTimeSurvived: 0,
  losses: 0,
  maxKillStreaks: 0,
  mostSurvivalTime: 0,
  rankPoints: 0,
  rankPointsTitle: '0-0',
  revives: 0,
  rideDistance: 0,
  roadKills: 0,
  roundMostKills: 0,
  roundsPlayed: 0,
  suicides: 0,
  swimDistance: 0,
  teamKills: 0,
  timeSurvived: 0,
  top10s: 0,
  vehicleDestroys: 0,
  walkDistance: 0,
  weaponsAcquired: 0,
  weeklyKills: 0,
  weeklyWins: 0,
  winPoints: 0,
  wins: 0,
  avgRank: 0,
  roundsAnalysed: 0
};
