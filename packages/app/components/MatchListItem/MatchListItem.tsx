import { makeStyles } from '@material-ui/styles';
import React, { FunctionComponent, useEffect, useState } from 'react';
import getMatch, { Match } from 'utilities/th-api/match';
import { ListItem, ListItemText, Typography } from '@material-ui/core';
import { Player } from 'utilities/th-api/player';
import timeSince from 'utilities/timeSince';
import millisToMinutesAndSeconds from 'utilities/millisToMinutesAndSeconds';
import TrophyProgress from 'components/TrophyProgress';
import { Trophy } from 'utilities/th-api/trophies';

interface MatchListItemProps {
  matchId: string;
  player: Player;
  trophies: Trophy[];
}

const useStyles = makeStyles(theme => ({
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
    fontSize: '1.2rem',
    minWidth: 80,
    textAlign: 'right'
  },
  placeCount: {
    fontSize: '0.8rem'
  },
  general: {
    minWidth: 100
  },
  trophies: {
    color: theme.palette.common.white,
    overflowX: 'auto',
    display: 'flex',
    flex: 1,
    justifyContent: 'center'
  }
}));

const MatchListItem: FunctionComponent<MatchListItemProps> = ({ matchId, player, trophies }) => {
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
    <ListItem button onClick={error ? handleRefresh(matchId) : undefined}>
      {loading && <ListItemText primary="Loading..." />}
      {!loading && error && <ListItemText primary="Click to refresh" />}
      {!loading && !error && match && (
        <div className={classes.container}>
          <div className={classes.general}>
            <Typography className={classes.timeSince}>
              {timeSince(new Date(match.createdAt).getTime())} ago
            </Typography>
            <Typography className={classes.duration}>
              {millisToMinutesAndSeconds(match.duration)}
            </Typography>
          </div>
          <div className={classes.trophies}>
            {match.trophyNames.map(trophyName => (
              <TrophyProgress
                key={trophyName}
                trophy={trophies.find(trophy => trophy.name === trophyName)}
                achieved={true}
              />
            ))}
          </div>
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
