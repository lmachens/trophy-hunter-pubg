import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/styles';
import Close from '@material-ui/icons/Close';
import Minimize from '@material-ui/icons/Minimize';
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  ListItemAvatar,
  Avatar,
  ListSubheader
} from '@material-ui/core';
import Link from 'components/Link';
import PlayerInfo from 'components/PlayerInfo';
import classNames from 'classnames';
import LastMatches from 'components/LastMatches';

interface OverwolfProps {
  route: string;
}

const drawerWidth = 200;
const useStyles = makeStyles(theme => ({
  frame: {
    display: 'flex',
    height: '100vh'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flexGrow: 1
  },
  item: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main
    }
  },
  selectedItem: {
    backgroundColor: theme.palette.secondary.dark
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

const Overwolf: FunctionComponent<OverwolfProps> = ({ children, route }) => {
  const classes = useStyles();

  return (
    <div className={classes.frame}>
      <AppBar position="fixed" className={classes.appBar}>
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
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <Link href="/">
            <ListItem
              button
              className={classNames(classes.item, { [classes.selectedItem]: route === '/' })}
            >
              <ListItemAvatar>
                <Avatar alt="Home" src="/static/icon.png" />
              </ListItemAvatar>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <ListSubheader>Active Player</ListSubheader>
          <PlayerInfo
            className={classNames(classes.item, { [classes.selectedItem]: route === '/player' })}
          />
          <ListSubheader>Last Matches</ListSubheader>
          <LastMatches />
        </List>
      </Drawer>
      <main className={classes.main}>
        <div className={classes.toolbar} />
        <div className={classes.content}>{children}</div>
      </main>
    </div>
  );
};

export default Overwolf;
