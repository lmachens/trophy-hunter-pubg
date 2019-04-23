import { makeStyles } from '@material-ui/styles';
import React, { FunctionComponent, useEffect, useState } from 'react';
import getMatch, { Match } from 'utilities/th-api/match';
import { ListItem, ListItemText, Typography } from '@material-ui/core';
import timeSince from 'utilities/timeSince';
import millisToMinutesAndSeconds from 'utilities/millisToMinutesAndSeconds';
import TrophyProgress from 'components/TrophyProgress';
import { Trophy } from 'utilities/th-api/trophies';

interface MatchListItemProps {
  matchId: string;
  platform: string;
  playerName: string;
  trophies?: Trophy[];
  onClick?(): void;
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    color: theme.palette.common.white
  },
  timeSince: {
    fontSize: '0.8rem'
  },
  duration: {},
  place: {
    fontSize: '1.2rem',
    textAlign: 'right'
  },
  placeCount: {
    fontSize: '0.8rem'
  },
  trophies: {
    overflowX: 'auto',
    display: 'flex',
    flex: 1,
    justifyContent: 'center'
  }
}));

const MatchListItem: FunctionComponent<MatchListItemProps> = ({
  matchId,
  platform,
  playerName,
  trophies,
  onClick
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [match, setMatch] = useState<Match | null>(null);

  const loadMatch = (matchId: string) => {
    setLoading(true);
    setError(false);
    return getMatch({
      platform,
      matchId,
      playerName
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
    <ListItem button onClick={error ? handleRefresh(matchId) : onClick}>
      {loading && <ListItemText primary="Loading..." />}
      {!loading && error && <ListItemText primary="Click to refresh" />}
      {!loading && !error && match && (
        <div className={classes.container}>
          <div>
            <Typography className={classes.timeSince}>
              {timeSince(new Date(match.createdAt).getTime())} ago
            </Typography>
            <Typography className={classes.duration}>
              {millisToMinutesAndSeconds(match.duration)}
            </Typography>
          </div>
          {trophies && (
            <div className={classes.trophies}>
              {match.trophyNames.map(trophyName => (
                <TrophyProgress
                  key={trophyName}
                  trophy={trophies.find(trophy => trophy.name === trophyName)}
                  achieved={true}
                />
              ))}
            </div>
          )}
          <Typography className={classes.place}>
            #{match.playerStats.winPlace}
            <span className={classes.placeCount}>/{match.participantCount}</span>
          </Typography>
        </div>
      )}
    </ListItem>
  );
};

export default MatchListItem;
