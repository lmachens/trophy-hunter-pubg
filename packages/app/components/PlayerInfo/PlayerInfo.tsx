import React, { FunctionComponent } from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import Link from 'components/Link';
import { usePlayer } from 'contexts/player';

interface PlayerInfoProps {
  selected: boolean;
}

const PlayerInfo: FunctionComponent<PlayerInfoProps> = ({ selected }) => {
  const player = usePlayer();
  return (
    <Link href="/">
      <ListItem button selected={selected}>
        <ListItemText primary={player ? player.name : 'Unknown Trophy Hunter'} />
      </ListItem>
    </Link>
  );
};

export default PlayerInfo;
