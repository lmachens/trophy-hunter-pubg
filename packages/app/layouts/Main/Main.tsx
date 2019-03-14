import React, { FunctionComponent, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import SubDrawer from 'components/SubDrawer';
import { Divider, List } from '@material-ui/core';
import PlayerInfo from 'components/PlayerInfo';
import LastMatches from 'components/LastMatches';
import { RouterProps } from 'next/router';
import { useStorage } from 'contexts/storage';
import getPlayer, { Player } from 'utilities/th-api/player';

interface MainProps {
  router: RouterProps;
}

const useStyles = makeStyles({
  container: {
    flex: 1,
    display: 'flex'
  },
  drawerContent: {
    width: 250,
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  }
});

const Main: FunctionComponent<MainProps> = ({ children, router }) => {
  const classes = useStyles();
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
    <div className={classes.container}>
      <SubDrawer>
        {player && (
          <List className={classes.drawerContent}>
            <PlayerInfo player={player} selected={router.route === '/'} />
            <Divider />
            <LastMatches player={player} router={router} />
          </List>
        )}
      </SubDrawer>
      {children}
    </div>
  );
};

export default Main;
