import React, { FunctionComponent } from 'react';
import { RouterProps } from 'next/router';
import { Divider, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import Link from 'components/Link';
import { useAccount } from 'contexts/account';
import Search from '@material-ui/icons/Search';

interface AppDrawerContentProps {
  router: RouterProps;
}

const AppDrawerContent: FunctionComponent<AppDrawerContentProps> = ({ router }) => {
  const account = useAccount();

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
      {account && (
        <>
          <Link href={`/player?platform=${account.platform}&playerId=${account.id}`}>
            <ListItem button selected={router.route === '/player'}>
              <ListItemText primary={account.playerName} />
            </ListItem>
          </Link>
        </>
      )}
    </>
  );
};

export default AppDrawerContent;
