import { createContext } from 'react';
import { Player } from 'utilities/th-api/player';

interface PlayerContextProps {
  player?: Player;
  refreshPlayer?(props: { platform: string; playerName: string }): void;
}
const PlayerContext = createContext<PlayerContextProps>({});

export default PlayerContext;
