import React, { FunctionComponent } from 'react';
import PlayerInfo from 'components/PlayerInfo';
import LastMatches from 'components/LastMatches';
import { Divider, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  container: {
    width: 250,
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  }
});

const MainDrawerContent: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <List className={classes.container}>
      <PlayerInfo />
      <Divider />
      <LastMatches />
    </List>
  );
};

export default MainDrawerContent;
