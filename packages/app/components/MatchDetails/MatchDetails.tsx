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
    padding: theme.spacing(3),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'auto'
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
    <div className={classes.container}>
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
      <div>
        <Typography className={classes.place}>
          #{match.playerStats.winPlace}
          <span className={classes.placeCount}>/{match.participantCount}</span>
        </Typography>
        <Typography>
          {MAPS[match.mapName]} | {millisToMinutesAndSeconds(match.duration)} |{' '}
          {timeSince(date.getTime())} ago | {match.trophyNames.length}/{trophies.length} Trophies
        </Typography>
      </div>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PlayerTrophiesCard trophies={trophies} achievedTrophies={achievedTrophies} />
        </Grid>
        <Grid item xs={12}>
          <MatchAttributes attributes={attributes} match={match} />
        </Grid>
      </Grid>
    </div>
  );
};

export default MatchDetails;
