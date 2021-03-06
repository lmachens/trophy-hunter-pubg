import React, { FunctionComponent, useState } from 'react';
import { Divider, Typography, Breadcrumbs, Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Match, MAPS } from 'utilities/th-api/match';
import { Trophy } from 'utilities/th-api/trophies';
import MatchAttributes from 'components/MatchAttributes';
import { Attributes, Attribute } from 'utilities/th-api/attributes';
import millisToMinutesAndSeconds from 'utilities/millisToMinutesAndSeconds';
import timeSince from 'utilities/timeSince';
import Link from 'components/Link';
import PlayerTrophiesCard from 'components/PlayerTrophiesCard';

interface MatchPageProps {
  attributes: Attributes;
  match: Match;
  trophies: Trophy[];
  platform: string;
  playerName: string;
}

const useStyles = makeStyles((theme: Theme) => ({
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

const MatchDetails: FunctionComponent<MatchPageProps> = ({
  attributes,
  match,
  trophies,
  platform,
  playerName
}) => {
  const classes = useStyles();
  const [hoveredTrophy, setHoveredTrophy] = useState<Trophy | undefined>();
  const [hoveredAttribute, setHoveredAttribute] = useState<Attribute | undefined>();

  const handleHoverStart = (trophy: Trophy) => {
    setHoveredTrophy(trophy);
  };

  const handleHoverEnd = () => {
    setHoveredTrophy(undefined);
  };

  const handleAttributeHoverStart = (attribute: Attribute) => {
    setHoveredAttribute(attribute);
  };

  const handleAttributeHoverEnd = () => {
    setHoveredAttribute(undefined);
  };

  const achievedTrophies = match.trophyNames.reduce((acc, trophyName) => {
    return { ...acc, [trophyName]: 1 };
  }, {});
  const date = new Date(match.createdAt);
  return (
    <Grid container spacing={2} className={classes.container} alignContent="flex-start">
      <Grid item xs={12}>
        <Breadcrumbs aria-label="Breadcrumb">
          <Link color="inherit" href={`/player?platform=${platform}&playerName=${playerName}`}>
            {match.playerName}
          </Link>
          <Link
            color="textPrimary"
            aria-current="page"
            href={`/match?platform=${platform}&matchId=${match.matchId}&playerName=${playerName}`}
          >
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
        <PlayerTrophiesCard
          trophies={trophies}
          attribute={hoveredAttribute}
          achievedTrophies={achievedTrophies}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
        />
      </Grid>
      <Grid item xs={12}>
        <MatchAttributes
          attributes={attributes}
          match={match}
          trophy={hoveredTrophy}
          onHoverStart={handleAttributeHoverStart}
          onHoverEnd={handleAttributeHoverEnd}
        />
      </Grid>
    </Grid>
  );
};

export default MatchDetails;
