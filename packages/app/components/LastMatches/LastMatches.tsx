import React, { FunctionComponent } from 'react';
import { useStorage } from 'contexts/storage';
import { ListItem, ListItemText } from '@material-ui/core';
import Link from 'components/Link';
import Player from 'utilities/th-api/player/interface';
import { makeStyles } from '@material-ui/styles';

interface LastMatchesProps {
  className?: string;
}

const useStyles = makeStyles({
  container: {}
});

const LastMatches: FunctionComponent<LastMatchesProps> = ({ className }) => {
  const { storageValues } = useStorage(['th-pubg-player']);
  const classes = useStyles();

  const player: Player =
    storageValues['th-pubg-player'] && JSON.parse(storageValues['th-pubg-player']);

  if (!player) {
    return null;
  }

  return (
    <div className={classes.container}>
      {player.matches.splice(0, 5).map(match => (
        <Link key={match.id} href={`/match?platform=${player.platform}&matchId=${match.id}`}>
          <ListItem button className={className}>
            <ListItemText primary={player.name} />
          </ListItem>
        </Link>
      ))}
    </div>
  );
};

export default LastMatches;
