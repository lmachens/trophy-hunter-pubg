import getPUBGApi from '../getPUBGApi';
import Players from './interface';

interface GetPlayerProps {
  platform: string;
  playerName?: string;
  playerId?: string;
}

const getPlayer = ({ platform, playerName, playerId }: GetPlayerProps) => {
  return getPUBGApi<Players>({
    platform,
    endpoint: `players?filter[${playerName ? 'playerNames' : 'playerIds'}]=${encodeURI(
      playerName || playerId!
    )}`
  }).then(players => players.data[0]);
};

export default getPlayer;
