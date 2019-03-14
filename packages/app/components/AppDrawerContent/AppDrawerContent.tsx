import React, { useEffect, FunctionComponent } from 'react';
import { useStorage } from 'contexts/storage';
import getPlayer, { Player } from 'utilities/th-api/player';
import { Divider } from '@material-ui/core';
import PlayerInfo from 'components/PlayerInfo';
import LastMatches from 'components/LastMatches';
import { RouterProps } from 'next/router';

interface AppDrawerContentProps {
  router: RouterProps;
}

const AppDrawerContent: FunctionComponent<AppDrawerContentProps> = ({ router }) => {
  const { storageValues, setItem } = useStorage(['th-pubg-player']);

  const player: Player = storageValues['th-pubg-player'];

  useEffect(() => {
    if (player) {
      getPlayer({ platform: player.platform, playerName: player.name })
        .then((player: Player) => {
          setItem('th-pubg-player', player);
        })
        .catch((error: Error) => {
          console.error(error);
        });
    }
  }, [player && player.id]);

  return (
    <>
      <PlayerInfo player={player} selected={router.route === '/'} />
      <Divider />
      {player && <LastMatches player={player} router={router} />}
    </>
  );
};

export default AppDrawerContent;
