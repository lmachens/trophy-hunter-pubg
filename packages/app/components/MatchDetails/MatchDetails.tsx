import React, { FunctionComponent } from 'react';
import { Grid, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Match } from 'utilities/th-api/match';
import { Trophy } from 'utilities/th-api/trophies';
import MatchTrophy from 'components/MatchTrophy';
import MatchAttributes from 'components/MatchAttributes';
import { Attributes } from 'utilities/th-api/attributes';

interface MatchPageProps {
  attributes: Attributes;
  match: Match;
  trophies: Trophy[];
}

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(3),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'auto'
  },
  trophies: {
    flex: 1,
    marginTop: theme.spacing(1)
  },
  score: {
    marginBottom: theme.spacing(1)
  },
  attributes: {
    marginTop: theme.spacing(1)
  }
}));

const MatchDetails: FunctionComponent<MatchPageProps> = ({ attributes, match, trophies }) => {
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
            <MatchTrophy key={trophy.name} trophy={trophy} match={match} />
          ))}
        </Grid>
      </div>
      <Divider />
      <div className={classes.attributes}>
        <MatchAttributes attributes={attributes} match={match} />
      </div>
    </div>
  );
};

export default MatchDetails;
