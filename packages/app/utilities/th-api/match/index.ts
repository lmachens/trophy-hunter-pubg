import getTHApi from '../getTHApi';
import { Match } from './interface';

interface GetMatchProps {
  platform: string;
  matchId: string;
  playerId: string;
}

const promiseCache: {
  [matchId: string]: Promise<Match>;
} = {};

const getMatch = ({ platform, matchId, playerId }: GetMatchProps) => {
  if (!promiseCache[matchId]) {
    promiseCache[matchId] = getTHApi<Match>(
      `match?platform=${platform}&matchId=${matchId}&playerId=${playerId}`
    );
  }
  return promiseCache[matchId];
};

export default getMatch;
export * from './interface';
