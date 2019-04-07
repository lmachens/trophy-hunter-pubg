import React from 'react';
import PlayerSearch from 'components/PlayerSearch';
import { NextFunctionComponent } from 'next';
import { makeStyles } from '@material-ui/styles';
import Link from 'next/link';
import { useAccount } from 'contexts/account';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundImage: 'url(/static/backgrounds/main.jpg)',
    backgroundPosition: 'center right',
    backgroundSize: 'cover',
    padding: theme.spacing(3),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  logo: {
    maxWidth: 350,
    position: 'absolute',
    top: -140,
    left: 0,
    right: 0,
    margin: '0 auto'
  },
  latest: {
    margin: theme.spacing(2)
  },
  playerSearch: {
    width: 400,
    maxWidth: '90vw',
    height: 50
  }
}));

const SearchPage: NextFunctionComponent = () => {
  const classes = useStyles();
  const account = useAccount();

  return (
    <div className={classes.container}>
      <img className={classes.logo} src="/static/logo.png" />
      <PlayerSearch autoFocus className={classes.playerSearch} />
      {account && (
        <Link href="/">
          <Button className={classes.latest} variant="contained">
            {account.playerName}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default SearchPage;
