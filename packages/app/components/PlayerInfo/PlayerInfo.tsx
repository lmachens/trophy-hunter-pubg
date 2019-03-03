import React, { FunctionComponent, useState } from 'react';
import { useStorage } from 'contexts/storage';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Menu,
  MenuItem,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import Link from 'components/Link';
import Player from 'utilities/th-api/player/interface';
import ProfilePicture from 'components/ProfilePicture';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Router from 'next/router';

interface PlayerInfoProps {
  className?: string;
}

const PlayerInfo: FunctionComponent<PlayerInfoProps> = ({ className }) => {
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

  if (!player) {
    return null;
  }

  return (
    <>
      <Link href={`/player?platform=${player.platform}&playerName=${player.name}`}>
        <ListItem button className={className}>
          <ListItemAvatar>
            <ProfilePicture name={player.name} />
          </ListItemAvatar>
          <ListItemText primary={player.name} />
          <ListItemSecondaryAction>
            <IconButton
              aria-label="More"
              aria-owns={open ? 'long-menu' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </Link>
      <Menu id="player-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleChangePlayer}>Change Player</MenuItem>
      </Menu>
    </>
  );
};

export default PlayerInfo;
