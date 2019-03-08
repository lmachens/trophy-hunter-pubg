import '../_bootstrap';

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import PlayerSearch from 'components/PlayerSearch';
import { NextFunctionComponent } from 'next';
import { Drawer, Hidden, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MainDrawerContent from 'components/MainDrawerContent';

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    display: 'flex'
  },
  content: {
    backgroundImage: 'url(/static/backgrounds/main.jpg)',
    backgroundPosition: 'center right',
    backgroundSize: 'cover',
    padding: theme.spacing.unit * 3,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  drawer: {
    height: '100%'
  },
  drawerPaper: {
    position: 'relative',
    height: '100%'
  },
  menuButton: {
    position: 'absolute',
    right: 2,
    top: 2,
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
}));

const Home: NextFunctionComponent = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = <MainDrawerContent />;

  return (
    <div className={classes.container}>
      <Hidden mdUp implementation="css">
        <Drawer anchor="right" variant="temporary" open={mobileOpen} onClose={handleDrawerToggle}>
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper
          }}
          variant="persistent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        onClick={handleDrawerToggle}
        className={classes.menuButton}
      >
        <MoreVertIcon />
      </IconButton>
      <div className={classes.content}>
        <PlayerSearch />
      </div>
    </div>
  );
};

export default Home;
