import React, { FunctionComponent } from 'react';
import { useStorage } from 'contexts/storage';
import { ListItem, ListItemText } from '@material-ui/core';
import { Player } from 'utilities/th-api/player/interface';
import Link from 'components/Link';

interface PlayerInfoProps {
  selected: boolean;
}

const PlayerInfo: FunctionComponent<PlayerInfoProps> = ({ selected }) => {
  const { storageValues } = useStorage(['th-pubg-player']);

  const player: Player = storageValues['th-pubg-player'];
  return (
    <Link href="/">
      <ListItem button selected={selected}>
        <ListItemText primary={player ? player.name : 'Trophy Hunter'} />
      </ListItem>
    </Link>
  );
};

export default PlayerInfo;
