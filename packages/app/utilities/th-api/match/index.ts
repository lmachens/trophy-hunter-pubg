import getTHApi from '../getTHApi';
import { Match } from './interface';

interface GetMatchProps {
  platform: string;
  matchId: string;
  playerId: string;
}

const getMatch = ({ platform, matchId, playerId }: GetMatchProps) => {
  return getTHApi<Match>(`match?platform=${platform}&matchId=${matchId}&playerId=${playerId}`);
};

export default getMatch;
export * from './interface';
