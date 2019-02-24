import getPUBGApi from '../getPUBGApi';
import Match from './interface';

interface GetMatchProps {
  platform: string;
  matchId: string;
}

const getMatch = ({ platform, matchId }: GetMatchProps) => {
  return getPUBGApi<Match>({
    platform,
    endpoint: `matches/${matchId}`
  });
};

export default getMatch;
