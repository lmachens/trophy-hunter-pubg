import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { NextFunctionComponent } from 'next';
import getTrophies, { Trophy } from 'utilities/th-api/trophies';
import getAttributes, { Attributes } from 'utilities/th-api/attributes';
import { Grid, Typography, Divider, Button, Breadcrumbs } from '@material-ui/core';
import { MAPS } from 'utilities/th-api/match';
import PlayerTrophiesCard from 'components/PlayerTrophiesCard';
import MatchAttributes from 'components/MatchAttributes';
import { useLive } from 'contexts/live';

interface LivePageProps {
  attributes: Attributes;
  trophies: Trophy[];
}

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(2)
  },
  root: {
    margin: 'auto',
    textAlign: 'center'
  },
  button: {
    margin: theme.spacing(2)
  }
}));

const LivePage: NextFunctionComponent<LivePageProps> = ({ attributes, trophies }) => {
  const classes = useStyles();
  const { game, match } = useLive();
  const [hoveredTrophy, setHoveredTrophy] = useState<Trophy | undefined>();

  const handleHoverStart = (trophy: Trophy) => {
    setHoveredTrophy(trophy);
  };

  const handleHoverEnd = () => {
    setHoveredTrophy(undefined);
  };

  if (typeof overwolf === 'undefined') {
    return (
      <div className={classes.root}>
        <Typography variant="h1">Overwolf App</Typography>
        <Typography variant="h2">Download app for live statistics</Typography>
        <Button className={classes.button} variant="outlined" color="primary" disabled>
          Coming soon
        </Button>
      </div>
    );
  }

  const achievedTrophies = match
    ? match.trophyNames.reduce((acc, trophyName) => {
        return { ...acc, [trophyName]: 1 };
      }, {})
    : {};

  return (
    <Grid container spacing={2} className={classes.container} alignContent="flex-start">
      <Grid item xs={12}>
        <Breadcrumbs aria-label="Breadcrumb">
          <Typography color="inherit">{game ? game.displayName : 'No game running'}</Typography>
          {game && (
            <Typography color="textPrimary">
              {game.startedAt.toLocaleDateString()} {game.startedAt.toLocaleTimeString()}
            </Typography>
          )}
        </Breadcrumbs>
      </Grid>
      <Grid item xs={12}>
        <Typography>{match ? MAPS[match.mapName] : 'No match started'}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <PlayerTrophiesCard
          trophies={trophies}
          achievedTrophies={achievedTrophies}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
        />
      </Grid>
      <Grid item xs={12}>
        <MatchAttributes attributes={attributes} match={match} trophy={hoveredTrophy} />
      </Grid>
    </Grid>
  );
};

LivePage.getInitialProps = async () => {
  const attributesPromise = getAttributes();
  const trophiesPromise = getTrophies();

  const [attributes, trophies] = await Promise.all([attributesPromise, trophiesPromise]);
  return { attributes, trophies };
};

export default LivePage;
