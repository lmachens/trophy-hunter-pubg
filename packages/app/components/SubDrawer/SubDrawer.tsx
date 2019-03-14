import React, { FunctionComponent, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Drawer, Hidden, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
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

const SubDrawer: FunctionComponent = ({ children }) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Hidden mdUp implementation="css">
        <Drawer
          anchor="right"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {children}
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
          {children}
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
    </>
  );
};

export default SubDrawer;
