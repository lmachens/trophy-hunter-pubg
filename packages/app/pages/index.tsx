import '../_bootstrap';

import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/styles';
import PlayerSearch from 'components/PlayerSearch';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundImage: 'url(/static/backgrounds/main.jpg)',
    backgroundPosition: 'center right',
    backgroundSize: 'cover',
    padding: theme.spacing.unit * 3,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const Home: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <PlayerSearch />
    </div>
  );
};

export default Home;
