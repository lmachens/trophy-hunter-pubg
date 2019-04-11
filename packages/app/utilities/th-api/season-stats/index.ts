import getTHApi from '../getTHApi';
import { SeasonStats } from './interface';

interface GetSeasonStatsProps {
  platform: string;
  playerName: string;
  seasonId?: string;
}

const getSeasonStats = ({ platform, playerName, seasonId }: GetSeasonStatsProps) => {
  let url = `season-stats?platform=${platform}&playerName=${playerName}`;
  if (seasonId) {
    url += `&seasonId=${seasonId}`;
  }
  return getTHApi<SeasonStats>(url);
};

export default getSeasonStats;
export * from './interface';
