import getPUBGApi from '../getPUBGApi';
import Players from './interface';

interface GetPlayerProps {
  platform: string;
  playerName: string;
}

const getPlayer = ({ platform, playerName }: GetPlayerProps) => {
  return getPUBGApi<Players>({
    platform,
    endpoint: `players?filter[playerNames]=${encodeURI(playerName)}`
  });
};

export default getPlayer;
