import { FunctionComponent, useEffect, useRef } from 'react';
import getPlayer, { Player } from 'utilities/th-api/player';
import { useStorage } from 'contexts/storage';

const interval = 10000;
const AutoRefresh: FunctionComponent = () => {
  const { storageValues, setItem } = useStorage(['th-pubg-player']);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const player: Player = storageValues['th-pubg-player'];

  useEffect(() => {
    if (player) {
      timeout.current = setInterval(() => {
        getPlayer({ platform: player.platform, playerName: player.name })
          .then((player: Player) => {
            setItem('th-pubg-player', player);
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

  return null;
};

export default AutoRefresh;
