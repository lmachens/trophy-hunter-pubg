import React, { FunctionComponent } from 'react';
import { Grid, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import TrophyIcon from 'components/TrophyIcon';
import DoneIcon from '@material-ui/icons/Done';
import { Trophy } from 'utilities/th-api/trophies';
import { Match } from 'utilities/th-api/match';

interface MatchTrophyProps {
  trophy: Trophy;
  match: Match;
}

const useStyles = makeStyles(theme => ({
  item: {
    background: '#444',
    position: 'relative',
    margin: 1,
    width: 110,
    height: 110
  },
  trophy: {
    margin: 4,
    width: 100,
    height: 100
  },
  doneIcon: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    borderRadius: '30%',
    backgroundColor: theme.palette.secondary.main
  }
}));

const MatchTrophy: FunctionComponent<MatchTrophyProps> = ({ trophy, match }) => {
  const classes = useStyles();
  const achieved = match.trophyNames.includes(trophy.name);

  return (
    <Tooltip title={trophy.description}>
      <Grid item className={classes.item}>
        <TrophyIcon
          className={classes.trophy}
          trophy={trophy}
          color={achieved ? 'inherit' : 'disabled'}
        />
        {achieved && <DoneIcon className={classes.doneIcon} />}
      </Grid>
    </Tooltip>
  );
};

export default MatchTrophy;
