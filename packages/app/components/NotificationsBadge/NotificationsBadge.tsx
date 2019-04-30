import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { IconButton, Badge, Menu, MenuItem, Typography, Theme } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useAccount, useChangeAccount } from 'contexts/account';
import getPlayer from 'utilities/th-api/player';
import Link from 'components/Link';
import MatchListItem from 'components/MatchListItem';
import { makeStyles } from '@material-ui/styles';
import Router from 'next/router';

interface NotificationsBadgeProps {
  className?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  playerName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    margin: theme.spacing(1)
  },
  menuPaper: {
    minWidth: 260
  }
}));

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
      const recentMatch = player.matches[0];
      if (recentMatch !== account.recentMatch) {
        const oldIndex = player.matches.indexOf(account.recentMatch);
        const newMatches = player.matches.slice(
          0,
          oldIndex === -1 ? player.matches.length : oldIndex
        );
        setNotifications(newMatches);
        changeAccount({ ...account, recentMatch });

        if ('Notification' in window) {
          const notification = new Notification('Trophy Hunter PUBG', {
            body: 'A new match is analysed',
            icon: '/static/icon.png',
            vibrate: [200, 100, 200, 100, 200, 100, 200]
          });
          notification.onclick = function() {
            window.focus();
            Router.push(
              `/match?matchId=${recentMatch}&platform=${player.platform}&playerName=${player.name}`
            );
            this.close();
          };
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (account) {
      Notification.requestPermission();
    }

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
    <div className={className}>
      <Link href="/">
        <Typography className={classes.playerName}>{account ? account.playerName : ''}</Typography>
      </Link>
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
        open={open}
        onClose={handleClose}
        disableAutoFocusItem
        classes={{
          paper: classes.menuPaper
        }}
      >
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
    </div>
  );
};

export default NotificationsBadge;
