import React, { FunctionComponent, useState } from 'react';
import { useStorage } from 'contexts/storage';
import {
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import { Player } from 'utilities/th-api/player/interface';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Router from 'next/router';

const PlayerInfo: FunctionComponent = () => {
  const { storageValues, removeItem } = useStorage(['th-pubg-player']);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const player: Player =
    storageValues['th-pubg-player'] && JSON.parse(storageValues['th-pubg-player']);

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePlayer = () => {
    setAnchorEl(null);
    removeItem('th-pubg-player');
    Router.push('/');
  };

  return (
    <>
      <ListItem>
        <ListItemText primary={player ? player.name : 'Trophy Hunter'} />
        <ListItemSecondaryAction>
          <IconButton
            aria-label="More"
            aria-owns={open ? 'long-menu' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            disabled={!player}
          >
            <MoreVertIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Menu id="player-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleChangePlayer}>Change Player</MenuItem>
      </Menu>
    </>
  );
};

export default PlayerInfo;
