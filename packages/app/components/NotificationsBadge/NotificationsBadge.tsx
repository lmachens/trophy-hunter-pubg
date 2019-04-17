import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { IconButton, Badge, Menu, MenuItem, Divider } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useAccount, useChangeAccount } from 'contexts/account';
import getPlayer from 'utilities/th-api/player';
import Link from 'components/Link';
import MatchListItem from 'components/MatchListItem';

const NotificationsBadge: FunctionComponent = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const account = useAccount();
  const interval = useRef<NodeJS.Timeout | null>(null);
  const changeAccount = useChangeAccount();
  const [notifications, setNotifications] = useState<string[]>([]);

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (account) {
      interval.current = setInterval(async () => {
        try {
          const player = await getPlayer({
            platform: account.platform,
            playerName: account.playerName
          });
          if (player.matches[0] !== account.recentMatch) {
            const oldIndex = player.matches.indexOf(account.recentMatch);
            const newMatches = player.matches.slice(
              0,
              oldIndex === -1 ? player.matches.length : oldIndex
            );
            setNotifications(newMatches);
            changeAccount({ ...account, recentMatch: player.matches[0] });
          }
        } catch (error) {
          console.error(error);
        }
      }, 900000);
    }
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [account && account.playerName]);

  return (
    <>
      <IconButton
        color="inherit"
        aria-owns={open ? 'menu-appbar' : undefined}
        aria-haspopup="true"
        onClick={handleMenu}
      >
        <Badge badgeContent={notifications.length} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        onClose={handleClose}
        disableAutoFocusItem
      >
        <Link href="/">
          <MenuItem onClick={handleClose}>{account ? account.playerName : 'Unknown'}</MenuItem>
        </Link>
        <Divider />
        {account &&
          notifications.map(matchId => (
            <Link
              key={matchId}
              href={`/match?platform=${account.platform}&matchId=${matchId}&playerName=${
                account.playerName
              }`}
            >
              <MenuItem onClick={handleClose}>
                <MatchListItem
                  matchId={matchId}
                  platform={account.platform}
                  playerName={account.playerName}
                />
              </MenuItem>
            </Link>
          ))}
        {notifications.length === 0 && <MenuItem onClick={handleClose}>No Notifications</MenuItem>}
      </Menu>
    </>
  );
};

export default NotificationsBadge;
