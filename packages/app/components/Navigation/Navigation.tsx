import React, { FunctionComponent } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Tooltip,
  Drawer,
  Hidden,
  Theme
} from '@material-ui/core';
import Link from 'components/Link';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { RouterProps } from 'next/router';
import SearchIcon from '@material-ui/icons/Search';
import HelpIcon from '@material-ui/icons/HelpOutline';
import isOverwolfApp from 'utilities/overwolf/isOverwolfApp';

interface NavigationProps {
  router: RouterProps;
  mobileOpen: boolean;
  onClose(): void;
}

const drawerWidth = 76;
const useStyles = makeStyles((theme: Theme) => ({
  list: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  grow: {
    flex: 1
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  permanent: {
    paddingTop: 65,
    height: `100%`
  },
  drawerPaper: {
    backgroundColor: theme.palette.common.black,
    backgroundImage: 'url(/static/backgrounds/dark-mosaic.png)',
    width: drawerWidth
  },
  item: {
    borderLeft: `3px solid transparent`
  },
  selectedItem: {
    borderLeft: `3px solid ${theme.palette.secondary.dark}`
  },
  avatar: {
    borderRadius: 'unset'
  },
  avatarIcon: {
    backgroundColor: theme.palette.common.white
  },
  icon: {
    width: 32,
    height: 32
  }
}));

const Navigation: FunctionComponent<NavigationProps> = ({ router, mobileOpen, onClose }) => {
  const classes = useStyles();

  const drawer = (
    <List className={classes.list}>
      <Link href="/">
        <Tooltip title="Profile" placement="right" enterDelay={200}>
          <ListItem
            button
            className={classNames(classes.item, {
              [classes.selectedItem]:
                !router.route.startsWith('/overwolf') &&
                !router.route.startsWith('/search') &&
                !router.route.startsWith('/contribution') &&
                !router.route.startsWith('/discord') &&
                !router.route.startsWith('/about')
            })}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar} alt="Home" src="/static/icon.png" />
            </ListItemAvatar>
          </ListItem>
        </Tooltip>
      </Link>
      <Link href="/search">
        <Tooltip title="Player Search" placement="right" enterDelay={200}>
          <ListItem
            button
            className={classNames(classes.item, {
              [classes.selectedItem]: router.route.startsWith('/search')
            })}
          >
            <ListItemAvatar>
              <Avatar alt="Search" className={classes.avatarIcon}>
                <SearchIcon className={classes.icon} />
              </Avatar>
            </ListItemAvatar>
          </ListItem>
        </Tooltip>
      </Link>
      {!isOverwolfApp && (
        <Link href="/overwolf">
          <Tooltip title="Live Match" placement="right" enterDelay={200}>
            <ListItem
              button
              className={classNames(classes.item, {
                [classes.selectedItem]: router.route.startsWith('/overwolf')
              })}
            >
              <ListItemAvatar>
                <Avatar className={classes.avatar} alt="Live" src="/static/overwolf.png" />
              </ListItemAvatar>
            </ListItem>
          </Tooltip>
        </Link>
      )}
      <Link href="/contribution">
        <Tooltip title="Contribution" placement="right" enterDelay={200}>
          <ListItem
            button
            className={classNames(classes.item, {
              [classes.selectedItem]: router.route.startsWith('/contribution')
            })}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar} alt="Contribution" src="/static/github.png" />
            </ListItemAvatar>
          </ListItem>
        </Tooltip>
      </Link>
      <Link href="/discord">
        <Tooltip title="Discord" placement="right" enterDelay={200}>
          <ListItem
            button
            className={classNames(classes.item, {
              [classes.selectedItem]: router.route === '/discord'
            })}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar} alt="Discord" src="/static/discord.png" />
            </ListItemAvatar>
          </ListItem>
        </Tooltip>
      </Link>
      <div className={classes.grow} />
      <Link href="/about">
        <Tooltip title="About" placement="right" enterDelay={200}>
          <ListItem
            button
            className={classNames(classes.item, {
              [classes.selectedItem]: router.route === '/about'
            })}
          >
            <ListItemAvatar>
              <Avatar alt="About" className={classes.avatarIcon}>
                <HelpIcon className={classes.icon} />
              </Avatar>
            </ListItemAvatar>
          </ListItem>
        </Tooltip>
      </Link>
    </List>
  );
  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onClose}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, classes.permanent)
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default Navigation;
