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
  Avatar,
  Tooltip
} from '@material-ui/core';
import Link from 'components/Link';
import GameListener from 'components/GameListener';
import { RouterProps } from 'next/router';
import classNames from 'classnames';

interface AppLayout {
  router: RouterProps;
}

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
    flex: 1,
    height: '100%'
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
    width: theme.spacing(9) + 1,
    zIndex: theme.zIndex.drawer + 1
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: 'url(/static/backgrounds/dark-mosaic.png)',
    position: 'relative'
  },
  item: {
    borderLeft: `3px solid transparent`
  },
  selectedItem: {
    borderLeft: `3px solid ${theme.palette.secondary.dark}`
  },
  bottomLeft: {
    width: 20,
    height: 20,
    bottom: 0,
    left: 0,
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 2,
    cursor: 'sw-resize'
  },
  bottomRight: {
    width: 20,
    height: 20,
    bottom: 0,
    right: 0,
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 2,
    cursor: 'se-resize'
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

const dragResize = (edge: string) => () => {
  overwolf.windows.getCurrentWindow(result => {
    overwolf.windows.dragResize(result.window.id, edge);
  });
};

const isOverwolfApp = typeof overwolf !== 'undefined';
const App: FunctionComponent<AppLayout> = ({ children, router }) => {
  const classes = useStyles();

  return (
    <div className={classes.frame}>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Link href="/">
            <img className={classes.logo} src="/static/text.png" />
          </Link>
          <img className={classes.game} src="/static/pubg.png" />
          {isOverwolfApp && (
            <>
              <div className={classes.grow} onMouseDown={handleMouseDown} />
              <IconButton className={classes.button} disableRipple onClick={handleMinimize}>
                <Minimize />
              </IconButton>
              <IconButton className={classes.button} disableRipple onClick={handleClose}>
                <Close />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <List>
            <Link href="/">
              <Tooltip title="To the Trophy Hunter App" placement="right" enterDelay={200}>
                <ListItem
                  button
                  className={classNames(classes.item, {
                    [classes.selectedItem]: !router.route.startsWith('/contribution')
                  })}
                >
                  <ListItemAvatar>
                    <Avatar alt="Home" src="/static/icon.png" />
                  </ListItemAvatar>
                </ListItem>
              </Tooltip>
            </Link>
            <Link href="/contribution">
              <Tooltip title="To the Contribution section" placement="right" enterDelay={200}>
                <ListItem
                  button
                  className={classNames(classes.item, {
                    [classes.selectedItem]: router.route === '/contribution'
                  })}
                >
                  <ListItemAvatar>
                    <Avatar alt="Contribution" src="/static/github.png" />
                  </ListItemAvatar>
                </ListItem>
              </Tooltip>
            </Link>
          </List>
        </nav>
        <main className={classes.main}>{children}</main>
      </div>
      <GameListener />
      {isOverwolfApp && (
        <>
          <div className={classes.bottomLeft} onMouseDown={dragResize('BottomLeft')} />
          <div className={classes.bottomRight} onMouseDown={dragResize('BottomRight')} />
        </>
      )}
    </div>
  );
};

export default App;
