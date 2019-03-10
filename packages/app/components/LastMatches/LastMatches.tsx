import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import { useStorage } from 'contexts/storage';
import { ListItem, ListItemText } from '@material-ui/core';
import Link from 'components/Link';
import { Player } from 'utilities/th-api/player/interface';
import { makeStyles } from '@material-ui/styles';
import getMatch, { Match } from 'utilities/th-api/match';
import throttle from 'utilities/throttle';
import MatchListItem from 'components/MatchListItem';
import classNames from 'classnames';
import { RouterProps } from 'next/router';

interface LastMatchesProps {
  router: RouterProps;
}

interface MatchMap {
  [matchId: string]: Match | 'loading' | 'error';
}

const itemHeight = 46;
const useStyles = makeStyles({
  container: {
    overflowY: 'auto',
    flex: 1
  },
  item: {
    height: itemHeight
  }
});

const cachedMatches: MatchMap = {};

const LastMatches: FunctionComponent<LastMatchesProps> = ({ router }) => {
  const { storageValues } = useStorage(['th-pubg-player']);
  const classes = useStyles();
  const [, triggerReload] = useState(0);
  const [items, setItems] = useState(0);
  const [maxItems, setMaxItems] = useState(0);
  const containerEl = useRef<HTMLDivElement>(null);

  const player: Player =
    storageValues['th-pubg-player'] && JSON.parse(storageValues['th-pubg-player']);

  const handleScroll = throttle(() => {
    if (containerEl.current) {
      const newItems = Math.floor(
        containerEl.current.scrollTop / itemHeight +
          containerEl.current.offsetHeight / itemHeight +
          5
      );
      setItems(newItems);
      if (newItems > maxItems) {
        setMaxItems(newItems);
      }
    }
  }, 1000);

  const loadMatch = (matchId: string) => {
    cachedMatches[matchId] = 'loading';
    return getMatch({
      platform: player.platform,
      matchId,
      playerId: player.id
    })
      .then(match => {
        cachedMatches[matchId] = match;
      })
      .catch(() => {
        cachedMatches[matchId] = 'error';
      });
  };
  const handleRefresh = (matchId: string) => () => loadMatch(matchId);

  useEffect(() => {
    if (player) {
      if (items === 0 && containerEl.current) {
        handleScroll();
      }
      const promises = player.matches.slice(0, items).map(matchInfo => {
        if (typeof cachedMatches[matchInfo.id] === 'undefined') {
          return loadMatch(matchInfo.id);
        }
      });
      Promise.all(promises).then(() => {
        triggerReload(Date.now());
      });
    }
  }, [storageValues['th-pubg-player'], items, containerEl.current]);

  return (
    <div className={classes.container} onScroll={handleScroll} ref={containerEl}>
      {player &&
        player.matches.slice(0, Math.max(maxItems, items)).map(match => (
          <Link
            key={match.id}
            href={`/match?platform=${player.platform}&matchId=${match.id}&playerId=${player.id}`}
          >
            <ListItem
              button
              className={classNames(classes.item)}
              selected={router.query && router.query.matchId === match.id}
              onClick={cachedMatches[match.id] === 'error' ? handleRefresh(match.id) : undefined}
            >
              {cachedMatches[match.id] && typeof cachedMatches[match.id] !== 'string' && (
                <MatchListItem match={cachedMatches[match.id] as Match} />
              )}
              {cachedMatches[match.id] === 'loading' && <ListItemText primary="Loading..." />}
              {cachedMatches[match.id] === 'error' && <ListItemText primary="Click to refresh" />}
            </ListItem>
          </Link>
        ))}
      {player && player.matches.length === 0 && (
        <ListItem>
          <ListItemText>No matches found</ListItemText>
        </ListItem>
      )}
    </div>
  );
};

export default LastMatches;
