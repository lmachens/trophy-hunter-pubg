import React, { FunctionComponent, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Close from '@material-ui/icons/Close';
import Minimize from '@material-ui/icons/Minimize';
import { IconButton, AppBar, Toolbar } from '@material-ui/core';
import Link from 'components/Link';
import GameListener from 'components/GameListener';
import Navigation from 'components/Navigation';
import { RouterProps } from 'next/router';
import MenuIcon from '@material-ui/icons/Menu';

interface AppLayoutProps {
  router: RouterProps;
}

const useStyles = makeStyles(theme => ({
  frame: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    userSelect: 'none'
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
  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: 'url(/static/backgrounds/dark-mosaic.png)',
    position: 'relative',
    overflow: 'auto'
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
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
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
const App: FunctionComponent<AppLayoutProps> = ({ children, router }) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.frame}>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
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
        <Navigation mobileOpen={mobileOpen} router={router} onClose={handleDrawerToggle} />
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
