import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import getPlayer, { Player } from 'utilities/th-api/player';
import PlayerContext from './PlayerContext';

interface PlayerProviderProps {
  defaultValue?: Player;
}

const interval = 120000;
const PlayerProvider: FunctionComponent<PlayerProviderProps> = ({ children, defaultValue }) => {
  const [player, setPlayer] = useState<Player | undefined>(defaultValue);

  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (player) {
      timeout.current = setInterval(() => {
        getPlayer({ platform: player.platform, playerName: player.name })
          .then((player: Player) => {
            setPlayer(player);
          })
          .catch((error: Error) => {
            console.error(error);
          });
      }, interval);
    }
    return () => {
      if (timeout.current) {
        clearInterval(timeout.current);
      }
    };
  }, [player && player.id]);

  return <PlayerContext.Provider value={player}>{children}</PlayerContext.Provider>;
};

export default PlayerProvider;
