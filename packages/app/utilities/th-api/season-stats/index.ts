import getTHApi from '../getTHApi';
import { SeasonStats } from './interface';

interface GetSeasonStatsProps {
  platform: string;
  playerId: string;
  seasonId?: string;
}

const getSeasonStats = ({ platform, playerId, seasonId }: GetSeasonStatsProps) => {
  let url = `season-stats?platform=${platform}&playerId=${playerId}`;
  if (seasonId) {
    url += '&seasonId=${seasonId}';
  }
  return getTHApi<SeasonStats>(url);
};

export default getSeasonStats;
export * from './interface';
