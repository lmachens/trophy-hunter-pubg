import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { IconButton, Badge, Menu, MenuItem, Divider, Typography } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useAccount, useChangeAccount } from 'contexts/account';
import getPlayer from 'utilities/th-api/player';
import Link from 'components/Link';
import MatchListItem from 'components/MatchListItem';
import { makeStyles } from '@material-ui/styles';

interface NotificationsBadgeProps {
  className?: string;
}

const useStyles = makeStyles({
  playerName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  menuPaper: {
    minWidth: 260
  }
});

const NotificationsBadge: FunctionComponent<NotificationsBadgeProps> = ({ className }) => {
  const classes = useStyles();
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
    setNotifications([]);
  };

  const updateNotifications = async () => {
    if (!account) return;
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
  };

  useEffect(() => {
    interval.current = setInterval(updateNotifications, 900000);
    updateNotifications();
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
      setNotifications([]);
    };
  }, [account && account.playerName]);

  return (
    <>
      <Typography className={classes.playerName}>{account ? account.playerName : ''}</Typography>
      <IconButton
        className={className}
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
        open={open}
        onClose={handleClose}
        disableAutoFocusItem
        classes={{
          paper: classes.menuPaper
        }}
      >
        <Link href="/">
          <MenuItem onClick={handleClose}>{account ? account.playerName : 'Unknown'}</MenuItem>
        </Link>
        <Divider />
        {account &&
          notifications.slice(0, 5).map(matchId => (
            <Link
              key={matchId}
              href={`/match?platform=${account.platform}&matchId=${matchId}&playerName=${
                account.playerName
              }`}
            >
              <MatchListItem
                onClick={handleClose}
                matchId={matchId}
                platform={account.platform}
                playerName={account.playerName}
              />
            </Link>
          ))}
        {notifications.length === 0 && <MenuItem onClick={handleClose}>No new matches</MenuItem>}
        {notifications.length > 5 && (
          <Link href="/">
            <MenuItem onClick={handleClose}>See more matches</MenuItem>
          </Link>
        )}
      </Menu>
    </>
  );
};

export default NotificationsBadge;
