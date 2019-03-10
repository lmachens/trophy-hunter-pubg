import React, { FunctionComponent } from 'react';
import { Grid, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Match } from 'utilities/th-api/match';
import { Trophy } from 'utilities/th-api/trophies';
import classNames from 'classnames';
import TrophyIcon from 'components/TrophyIcon';
import DoneIcon from '@material-ui/icons/Done';

interface MatchPageProps {
  match: Match;
  trophies: Trophy[];
}

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing.unit * 3,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  trophies: {
    flex: 1,
    marginTop: theme.spacing.unit
  },
  item: {
    background: '#444',
    position: 'relative'
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
  },
  score: {
    marginBottom: theme.spacing.unit
  }
}));

const MatchDetails: FunctionComponent<MatchPageProps> = ({ match, trophies }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.score}>
        <Typography>
          {match.trophyNames.length}/{trophies.length} Challenges Completed
        </Typography>
      </div>
      <Divider />
      <div className={classes.trophies}>
        <Grid container>
          {trophies.map(trophy => {
            const achieved = match.trophyNames.includes(trophy.name);
            return (
              <Grid
                item
                key={trophy.name}
                className={classNames(classes.item, {
                  [classes.achieved]: achieved
                })}
              >
                <TrophyIcon className={classes.trophy} trophy={trophy} />
                {achieved && <DoneIcon className={classes.doneIcon} />}
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default MatchDetails;
