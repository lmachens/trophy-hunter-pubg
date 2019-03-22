import { createContext } from 'react';
import { Player } from 'utilities/th-api/player';

const PlayerContext = createContext<Player | undefined>(undefined);

export default PlayerContext;
