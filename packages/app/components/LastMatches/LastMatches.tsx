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
  [matchId: string]: Match | null;
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

  useEffect(() => {
    if (player) {
      if (items === 0 && containerEl.current) {
        handleScroll();
      }
      const promises = player.matches.slice(0, items).map(matchInfo => {
        if (typeof cachedMatches[matchInfo.id] === 'undefined') {
          cachedMatches[matchInfo.id] = null;
          return getMatch({
            platform: player.platform,
            matchId: matchInfo.id,
            playerId: player.id
          }).then(match => {
            cachedMatches[match.matchId] = match;
          });
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
            >
              {cachedMatches[match.id] ? (
                <MatchListItem match={cachedMatches[match.id]!} />
              ) : (
                <ListItemText primary="loading" />
              )}
            </ListItem>
          </Link>
        ))}
    </div>
  );
};

export default LastMatches;
