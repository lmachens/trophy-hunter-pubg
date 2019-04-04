import getTHApi from '../getTHApi';
import { Player } from './interface';

interface GetPlayerProps {
  platform: string;
  playerName?: string;
  playerId?: string;
}

const getPlayer = ({ platform, playerName, playerId }: GetPlayerProps) => {
  return getTHApi<Player>(
    `player?platform=${platform}&${
      playerName ? `playerName=${encodeURI(playerName)}` : `playerId=${encodeURI(playerId!)}`
    }`
  );
};

export default getPlayer;
export * from './interface';
