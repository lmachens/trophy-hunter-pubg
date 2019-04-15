import React, { FunctionComponent, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, InputBase, MenuItem, Paper, Select, Snackbar } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import getPlayer from 'utilities/th-api/player';
import { useChangeAccount, useAccount } from 'contexts/account';
import Router from 'next/router';
import classNames from 'classnames';

interface PlayerSearchProps {
  autoFocus?: boolean;
  className?: string;
}

const useStyles = makeStyles(theme => ({
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#1d1c1dc7',
    border: '1px solid rgba(255, 255, 255, 0.23)'
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 0
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.common.white
  },
  select: {
    marginLeft: theme.spacing(1)
  }
}));

const platforms = ['Steam', 'PSN', 'XBOX', 'Kakao'];

const PlayerSearch: FunctionComponent<PlayerSearchProps> = ({ autoFocus, className }) => {
  const classes = useStyles();
  const [playerName, setPlayerName] = useState('');
  const [platform, setPlatform] = useState('Steam');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const changeAccount = useChangeAccount();
  const account = useAccount();

  const handlePlayerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value.trim());
  };

  const handlePlatformChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPlatform(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (playerName.length === 0 || loading) {
      return;
    }
    setError(null);
    setLoading(true);
    getPlayer({ platform, playerName })
      .then(player => {
        if (!account) {
          changeAccount({ platform, playerName, recentMatch: player.matches[0] });
        }
        setPlayerName('');
        Router.push(`/player?platform=${player.platform}&playerName=${player.name}`);
      })
      .catch((error: Error) => {
        console.error(error);
        setError(error);
        setLoading(false);
      });
  };

  const handleClose = (_event: React.SyntheticEvent, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Paper className={classNames(classes.paper, className)} elevation={1}>
        <Select
          className={classes.select}
          value={platform}
          onChange={handlePlatformChange}
          input={<InputBase name="platform" id="platform-select" />}
        >
          {platforms.map(platform => (
            <MenuItem value={platform} key={platform}>
              {platform}
            </MenuItem>
          ))}
        </Select>
        <InputBase
          autoFocus={autoFocus}
          className={classes.input}
          placeholder="Player Name"
          value={playerName}
          onChange={handlePlayerNameChange}
        />
        <IconButton
          className={classes.iconButton}
          aria-label="Search"
          disabled={playerName.length === 0 || loading}
          type="submit"
        >
          <Search />
        </IconButton>
      </Paper>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={!!error}
        onClose={handleClose}
        autoHideDuration={3000}
        ContentProps={{
          'aria-describedby': 'message-id',
          className: classes.error
        }}
        message={<span id="message-id">{error && error.message}</span>}
      />
    </form>
  );
};

export default PlayerSearch;
