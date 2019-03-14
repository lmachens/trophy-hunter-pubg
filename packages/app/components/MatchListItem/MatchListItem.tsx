import { makeStyles } from '@material-ui/styles';
import React, { FunctionComponent, useEffect, useState } from 'react';
import getMatch, { Match } from 'utilities/th-api/match';
import { ListItem, ListItemText, Typography, Divider } from '@material-ui/core';
import { Player } from 'utilities/th-api/player';

interface MatchListItemProps {
  className?: string;
  matchId: string;
  selected?: boolean;
  player: Player;
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between'
  },
  timeSince: {
    fontSize: '0.8rem'
  },
  duration: {},
  place: {
    fontSize: '1.2rem'
  },
  placeCount: {
    fontSize: '0.8rem'
  }
});

const millisToMinutesAndSeconds = (millis: number) => {
  const minutes = Math.floor(millis / 60);
  const seconds = parseInt((millis % 60).toFixed(0));
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

const timeSince = (date: number) => {
  const seconds = Math.floor((Date.now() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + ' years';
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + ' months';
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + ' days';
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + ' hours';
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + ' minutes';
  }
  return Math.floor(seconds) + ' seconds';
};

const MatchListItem: FunctionComponent<MatchListItemProps> = ({
  className,
  matchId,
  selected,
  player
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [match, setMatch] = useState<Match | null>(null);

  const loadMatch = (matchId: string) => {
    setLoading(true);
    setError(false);
    return getMatch({
      platform: player.platform,
      matchId,
      playerId: player.id
    })
      .then(match => {
        setMatch(match);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  const handleRefresh = (matchId: string) => () => loadMatch(matchId);

  useEffect(() => {
    loadMatch(matchId);
  }, [matchId]);

  return (
    <ListItem
      button
      className={className}
      selected={selected}
      onClick={error ? handleRefresh(matchId) : undefined}
    >
      {loading && <ListItemText primary="Loading..." />}
      {!loading && error && <ListItemText primary="Click to refresh" />}
      {!loading && !error && match && (
        <div className={classes.container}>
          <div>
            <Typography className={classes.timeSince}>
              {timeSince(new Date(match.createdAt).getTime())} ago
            </Typography>
            <Divider />
            <Typography className={classes.duration}>
              {millisToMinutesAndSeconds(match.duration)}
            </Typography>
          </div>
          <Typography className={classes.place}>
            #{match.participantStats.winPlace}
            <span className={classes.placeCount}>/{match.participantCount}</span>
          </Typography>
        </div>
      )}
    </ListItem>
  );
};

export default MatchListItem;
