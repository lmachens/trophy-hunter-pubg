import React, { FunctionComponent } from 'react';
import { Grid, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Match } from 'utilities/th-api/match';
import { Trophy } from 'utilities/th-api/trophies';
import MatchTrophy from 'components/MatchTrophy';

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
          {trophies.map(trophy => (
            <MatchTrophy
              key={trophy.name}
              trophy={trophy}
              achieved={match.trophyNames.includes(trophy.name)}
              match={match}
            />
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default MatchDetails;
