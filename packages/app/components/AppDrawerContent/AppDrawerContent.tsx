import React, { FunctionComponent } from 'react';
import { RouterProps } from 'next/router';
import { Divider, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import Link from 'components/Link';
import { usePlayer } from 'contexts/player';
import Search from '@material-ui/icons/Search';

interface AppDrawerContentProps {
  router: RouterProps;
}

const AppDrawerContent: FunctionComponent<AppDrawerContentProps> = ({ router }) => {
  const player = usePlayer();

  return (
    <>
      <Link href="/">
        <ListItem button selected={router.route === '/'}>
          <ListItemIcon>
            <Search />
          </ListItemIcon>
          <ListItemText primary="Player Search" />
        </ListItem>
      </Link>
      <Divider />
      {player && (
        <>
          <Link href={`/player?platform=${player.platform}&playerId=${player.id}`}>
            <ListItem button selected={router.route === '/player'}>
              <ListItemText primary={player.name} />
            </ListItem>
          </Link>
        </>
      )}
    </>
  );
};

export default AppDrawerContent;
