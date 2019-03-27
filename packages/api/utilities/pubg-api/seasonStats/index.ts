import getPUBGApi from '../getPUBGApi';
import SeasonStats from './interface';

interface GetSeasonStatsProps {
  platform: string;
  accountId: string;
  seasonId: string;
}

const getSeasonStats = ({ platform, accountId, seasonId }: GetSeasonStatsProps) => {
  return getPUBGApi<SeasonStats>({
    platform,
    endpoint: `players/${accountId}/seasons/${seasonId}`
  });
};

export default getSeasonStats;
