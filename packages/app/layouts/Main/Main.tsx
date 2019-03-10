import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/styles';
import SubDrawer from 'components/SubDrawer';
import { Divider, List } from '@material-ui/core';
import PlayerInfo from 'components/PlayerInfo';
import LastMatches from 'components/LastMatches';
import { RouterProps } from 'next/router';

interface MainProps {
  router: RouterProps;
}

const useStyles = makeStyles({
  container: {
    flex: 1,
    display: 'flex'
  },
  drawerContent: {
    width: 250,
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  }
});

const Main: FunctionComponent<MainProps> = ({ children, router }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <SubDrawer>
        <List className={classes.drawerContent}>
          <PlayerInfo selected={router.route === '/'} />
          <Divider />
          <LastMatches router={router} />
        </List>
      </SubDrawer>
      {children}
    </div>
  );
};

export default Main;
