import React, { FunctionComponent } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, Tooltip, Drawer, Hidden } from '@material-ui/core';
import Link from 'components/Link';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { RouterProps } from 'next/router';

interface NavigationProps {
  router: RouterProps;
  mobileOpen: boolean;
  onClose(): void;
}

const drawerWidth = 76;
const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  drawerPaper: {
    backgroundColor: theme.palette.common.black,
    backgroundImage: 'url(/static/backgrounds/dark-mosaic.png)',
    width: drawerWidth,
    top: 'inherit'
  },
  item: {
    borderLeft: `3px solid transparent`
  },
  selectedItem: {
    borderLeft: `3px solid ${theme.palette.secondary.dark}`
  },
  avatar: {
    borderRadius: 'unset'
  }
}));

const Navigation: FunctionComponent<NavigationProps> = ({ router, mobileOpen, onClose }) => {
  const classes = useStyles();

  const drawer = (
    <List>
      <Link href="/">
        <Tooltip title="To the Trophy Hunter App" placement="right" enterDelay={200}>
          <ListItem
            button
            className={classNames(classes.item, {
              [classes.selectedItem]:
                !router.route.startsWith('/contribution') && !router.route.startsWith('/discord')
            })}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar} alt="Home" src="/static/icon.png" />
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
              <Avatar className={classes.avatar} alt="Contribution" src="/static/github.png" />
            </ListItemAvatar>
          </ListItem>
        </Tooltip>
      </Link>
      <Link href="/discord">
        <Tooltip title="To Discord" placement="right" enterDelay={200}>
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
            paper: classes.drawerPaper
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default Navigation;
