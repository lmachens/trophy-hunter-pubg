import getTHApi from '../getTHApi';
import { Player } from './interface';

interface GetPlayerProps {
  platform: string;
  playerName: string;
}

const getPlayer = ({ platform, playerName }: GetPlayerProps) => {
  return getTHApi<Player>(`player?platform=${platform}&playerName=${encodeURI(playerName)}`);
};

export default getPlayer;
export * from './interface';
