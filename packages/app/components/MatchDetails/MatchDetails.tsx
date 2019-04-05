import React, { FunctionComponent } from 'react';
import { Divider, Typography, Breadcrumbs, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Match, MAPS } from 'utilities/th-api/match';
import { Trophy } from 'utilities/th-api/trophies';
import MatchAttributes from 'components/MatchAttributes';
import { Attributes } from 'utilities/th-api/attributes';
import millisToMinutesAndSeconds from 'utilities/millisToMinutesAndSeconds';
import timeSince from 'utilities/timeSince';
import Link from 'components/Link';
import PlayerTrophiesCard from 'components/PlayerTrophiesCard';

interface MatchPageProps {
  attributes: Attributes;
  match: Match;
  trophies: Trophy[];
}

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(2)
  },
  place: {
    fontSize: '1.3rem'
  },
  placeCount: {
    fontSize: '1rem'
  }
}));

const MatchDetails: FunctionComponent<MatchPageProps> = ({ attributes, match, trophies }) => {
  const classes = useStyles();

  const achievedTrophies = match.trophyNames.reduce((acc, trophyName) => {
    return { ...acc, [trophyName]: 1 };
  }, {});
  const date = new Date(match.createdAt);
  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item xs={12}>
        <Breadcrumbs aria-label="Breadcrumb">
          <Link color="inherit" href="/search">
            Search
          </Link>
          <Link color="inherit" href={`/`}>
            {match.playerName}
          </Link>
          <Link color="textPrimary" aria-current="page" href="#">
            {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </Link>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.place}>
          #{match.playerStats.winPlace}
          <span className={classes.placeCount}>/{match.participantCount}</span>
        </Typography>
        <Typography>
          {MAPS[match.mapName]} | {millisToMinutesAndSeconds(match.duration)} |{' '}
          {timeSince(date.getTime())} ago | {match.trophyNames.length}/{trophies.length} Trophies
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <PlayerTrophiesCard trophies={trophies} achievedTrophies={achievedTrophies} />
      </Grid>
      <Grid item xs={12}>
        <MatchAttributes attributes={attributes} match={match} />
      </Grid>
    </Grid>
  );
};

export default MatchDetails;
