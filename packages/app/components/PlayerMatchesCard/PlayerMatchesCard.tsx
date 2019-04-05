import React, { FunctionComponent, useState } from 'react';
import { ListItem, ListItemText, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Games from '@material-ui/icons/Games';
import { Player } from 'utilities/th-api/player';
import Link from 'components/Link';
import MatchListItem from 'components/MatchListItem';
import CardComponent from 'components/CardComponent';
import { Trophy } from 'utilities/th-api/trophies';

interface PlayerMatchesCardProps {
  player: Player;
  trophies: Trophy[];
}

const useStyles = makeStyles({
  container: {
    overflowY: 'auto'
  }
});

const PlayerMatchesCard: FunctionComponent<PlayerMatchesCardProps> = ({ player, trophies }) => {
  const classes = useStyles();
  const [maxItems, setMaxItems] = useState(5);

  const handleMore = () => {
    setMaxItems(maxItems + 5);
  };
  return (
    <CardComponent headerBackgroundColor="#903737" title="Matches (Total)" icon={<Games />}>
      {player.matches.length > 0 && (
        <div className={classes.container}>
          {player.matches.slice(0, maxItems).map(matchId => (
            <Link
              key={matchId}
              href={`/match?platform=${player.platform}&matchId=${matchId}&playerId=${player.id}`}
            >
              <MatchListItem matchId={matchId} player={player} trophies={trophies} />
            </Link>
          ))}
          <Button fullWidth onClick={handleMore}>
            Load more
          </Button>
        </div>
      )}
      {player.matches.length === 0 && (
        <ListItem>
          <ListItemText>No matches found</ListItemText>
        </ListItem>
      )}
    </CardComponent>
  );
};

export default PlayerMatchesCard;
