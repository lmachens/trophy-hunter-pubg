import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import { ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import throttle from 'utilities/throttle';
import MatchListItem from 'components/MatchListItem';
import { RouterProps } from 'next/router';
import Link from 'components/Link';
import { usePlayer } from 'contexts/player';

interface LastMatchesProps {
  router: RouterProps;
}

const itemHeight = 46;
const useStyles = makeStyles(theme => ({
  container: {
    overflowY: 'auto',
    flex: 1,
    backgroundColor: theme.palette.background.paper
  },
  item: {
    height: itemHeight
  }
}));

const LastMatches: FunctionComponent<LastMatchesProps> = ({ router }) => {
  const classes = useStyles();
  const [items, setItems] = useState(0);
  const [maxItems, setMaxItems] = useState(0);
  const containerEl = useRef<HTMLDivElement>(null);
  const player = usePlayer();

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
    if (player && items === 0 && containerEl.current) {
      handleScroll();
    }
  }, [player && player.id, items, containerEl.current]);

  return (
    <div className={classes.container} onScroll={handleScroll} ref={containerEl}>
      <ListSubheader>Last Matches</ListSubheader>
      {player &&
        player.matches.slice(0, Math.max(maxItems, items)).map(match => (
          <Link
            key={match.id}
            href={`/match?platform=${player.platform}&matchId=${match.id}&playerId=${player.id}`}
          >
            <MatchListItem
              className={classes.item}
              matchId={match.id}
              player={player}
              selected={router.query && router.query.matchId === match.id}
            />
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
