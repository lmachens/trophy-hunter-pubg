import React, { FunctionComponent, useState } from 'react';
import { Card, CardHeader, CardContent, ListItem, ListItemText, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Games from '@material-ui/icons/Games';
import { Player } from 'utilities/th-api/player';
import Link from 'components/Link';
import MatchListItem from 'components/MatchListItem';

interface PlayerMatchesCardProps {
  player: Player;
}

const useStyles = makeStyles({
  header: {
    background: '#903737'
  },
  content: {
    padding: 0,
    '&:last-child': {
      padding: 0
    }
  },
  container: {
    overflowY: 'auto'
  }
});

const PlayerMatchesCard: FunctionComponent<PlayerMatchesCardProps> = ({ player }) => {
  const classes = useStyles();
  const [maxItems, setMaxItems] = useState(5);

  const handleMore = () => {
    setMaxItems(maxItems + 5);
  };
  return (
    <Card>
      <CardHeader title="Matches (Total)" className={classes.header} avatar={<Games />} />
      <CardContent className={classes.content}>
        <div className={classes.container}>
          {player &&
            player.matches.slice(0, maxItems).map(matchId => (
              <Link
                key={matchId}
                href={`/match?platform=${player.platform}&matchId=${matchId}&playerId=${player.id}`}
              >
                <MatchListItem matchId={matchId} player={player} />
              </Link>
            ))}
          <Button fullWidth onClick={handleMore}>
            Load more
          </Button>
        </div>
        {player && player.matches.length === 0 && (
          <ListItem>
            <ListItemText>No matches found</ListItemText>
          </ListItem>
        )}
      </CardContent>
    </Card>
  );
};

export default PlayerMatchesCard;
