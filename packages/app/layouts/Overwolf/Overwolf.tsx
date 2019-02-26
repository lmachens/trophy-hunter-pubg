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
  ListSubheader,
  ListItemAvatar,
  Avatar
} from '@material-ui/core';
import Link from 'components/Link';

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
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  avatar: {
    height: 30,
    width: 30
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
          <Link href="/trophies">
            <ListItem button>
              <ListItemAvatar>
                <Avatar className={classes.avatar} alt="Trophies" src="/static/icon.png" />
              </ListItemAvatar>
              <ListItemText primary="Trophies" />
            </ListItem>
          </Link>
          <ListSubheader>Last Matches</ListSubheader>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default Overwolf;
