import React, { FunctionComponent } from 'react';
import { Grid, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import TrophyIcon from 'components/TrophyIcon';
import DoneIcon from '@material-ui/icons/Done';
import { Trophy } from 'utilities/th-api/trophies';

interface MatchTrophyProps {
  achieved: boolean;
  trophy: Trophy;
}

const useStyles = makeStyles(theme => ({
  item: {
    background: '#444',
    position: 'relative',
    margin: 1
  },
  achieved: {},
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

const MatchTrophy: FunctionComponent<MatchTrophyProps> = ({ achieved, trophy }) => {
  const classes = useStyles();

  return (
    <Tooltip title={trophy.description}>
      <Grid
        item
        className={classNames(classes.item, {
          [classes.achieved]: achieved
        })}
      >
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
