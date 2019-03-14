import React, { FunctionComponent } from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { Player } from 'utilities/th-api/player/interface';
import Link from 'components/Link';

interface PlayerInfoProps {
  selected: boolean;
  player?: Player;
}

const PlayerInfo: FunctionComponent<PlayerInfoProps> = ({ selected, player }) => {
  return (
    <Link href="/">
      <ListItem button selected={selected}>
        <ListItemText primary={player ? player.name : 'Unknown Trophy Hunter'} />
      </ListItem>
    </Link>
  );
};

export default PlayerInfo;
