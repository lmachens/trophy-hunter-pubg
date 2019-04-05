import React, { FunctionComponent } from 'react';
import { Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import TrophyIcon from 'components/TrophyIcon';
import { Trophy } from 'utilities/th-api/trophies';

interface TrophyProgressProps {
  achieved?: boolean;
  trophy?: Trophy;
}

const useStyles = makeStyles(theme => ({
  trophy: {
    margin: theme.spacing(1),
    width: 30,
    height: 30
  }
}));

const TrophyProgress: FunctionComponent<TrophyProgressProps> = ({ achieved, trophy }) => {
  if (!trophy) {
    return null;
  }
  const classes = useStyles();

  return (
    <Tooltip title={`${trophy.title}: ${trophy.description}`}>
      <TrophyIcon
        className={classes.trophy}
        trophy={trophy}
        color={achieved ? 'inherit' : 'disabled'}
      />
    </Tooltip>
  );
};

export default TrophyProgress;
