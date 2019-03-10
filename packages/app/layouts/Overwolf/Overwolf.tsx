import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/styles';
import Close from '@material-ui/icons/Close';
import Minimize from '@material-ui/icons/Minimize';
import {
  IconButton,
  List,
  ListItem,
  AppBar,
  Toolbar,
  ListItemAvatar,
  Avatar
} from '@material-ui/core';
import Link from 'components/Link';

const useStyles = makeStyles(theme => ({
  frame: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  },
  appBar: {
    backgroundImage: 'url(/static/backgrounds/gun-metal.png)',
    zIndex: theme.zIndex.drawer + 2
  },
  toolbar: {
    minHeight: 0,
    padding: 0,
    height: 30
  },
  logo: {
    height: 30,
    verticalAlign: 'middle',
    pointerEvents: 'none'
  },
  game: {
    height: 20,
    marginLeft: 6
  },
  grow: {
    flex: 1
  },
  button: {
    padding: '2px 8px',
    borderRadius: 0
  },
  container: {
    flex: 1,
    display: 'flex'
  },
  nav: {
    backgroundColor: theme.palette.common.black,
    backgroundImage: 'url(/static/backgrounds/dark-mosaic.png)',
    width: theme.spacing.unit * 9 + 1,
    zIndex: theme.zIndex.drawer + 1
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: 'url(/static/backgrounds/dark-mosaic.png)',
    position: 'relative'
  },
  selectedItem: {
    borderLeft: `3px solid ${theme.palette.secondary.dark}`
  }
}));

const handleMouseDown = () => {
  overwolf.windows.getCurrentWindow(result => {
    overwolf.windows.dragMove(result.window.id);
  });
};

const handleMinimize = () => {
  overwolf.windows.getCurrentWindow(result => {
    overwolf.windows.minimize(result.window.id, () => {});
  });
};

const handleClose = () => {
  overwolf.windows.getCurrentWindow(result => {
    overwolf.windows.close(result.window.id, () => {});
  });
};

const Overwolf: FunctionComponent = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.frame}>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Link href="/">
            <img className={classes.logo} src="/static/text.png" />
          </Link>
          <img className={classes.game} src="/static/pubg.png" />
          <div className={classes.grow} onMouseDown={handleMouseDown} />
          <IconButton className={classes.button} disableRipple onClick={handleMinimize}>
            <Minimize />
          </IconButton>
          <IconButton className={classes.button} disableRipple onClick={handleClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <List>
            <Link href="/">
              <ListItem button className={classes.selectedItem}>
                <ListItemAvatar>
                  <Avatar alt="Home" src="/static/icon.png" />
                </ListItemAvatar>
              </ListItem>
            </Link>
          </List>
        </nav>
        <main className={classes.main}>{children}</main>
      </div>
    </div>
  );
};

export default Overwolf;
