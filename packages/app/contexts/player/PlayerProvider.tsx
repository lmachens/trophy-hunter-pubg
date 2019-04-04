import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import getPlayer, { Player } from 'utilities/th-api/player';
import PlayerContext from './PlayerContext';
import { setCookie } from 'nookies';

interface PlayerProviderProps {
  defaultValue?: Player;
}

interface RefreshPlayerProps {
  platform: string;
  playerName: string;
}

const interval = 120000;
const PlayerProvider: FunctionComponent<PlayerProviderProps> = ({ children, defaultValue }) => {
  const [player, setPlayer] = useState<Player | undefined>(defaultValue);

  const timeout = useRef<NodeJS.Timeout | null>(null);

  const refreshPlayer = ({ platform, playerName }: RefreshPlayerProps) => {
    setCookie(undefined, 'thPubg', `${platform};${playerName}`, {
      maxAge: 365 * 24 * 60 * 60,
      path: '/'
    });
    console.log('getPlayer provider');
    getPlayer({ platform, playerName })
      .then((player: Player) => {
        setPlayer(player);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (player) {
      timeout.current = setInterval(() => {
        refreshPlayer({ platform: player.platform, playerName: player.name });
      }, interval);
    }
    return () => {
      if (timeout.current) {
        clearInterval(timeout.current);
      }
    };
  }, [player && player.id]);

  const value = {
    player,
    refreshPlayer
  };
  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};

export default PlayerProvider;
