import React, { FunctionComponent, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Theme,
  Typography
} from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import getPlayer from 'utilities/th-api/player';
import { useChangeAccount, useAccount } from 'contexts/account';
import Router from 'next/router';
import classNames from 'classnames';

interface PlayerSearchProps {
  autoFocus?: boolean;
  className?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    zIndex: 1
  },
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
const formatError = (error: any) => {
  if (!error) {
    return '';
  }
  if (error.response && error.response.status) {
    if (error.response.status === 404) {
      return 'Can not find player';
    }
  }
  return error.message;
};
const PlayerSearch: FunctionComponent<PlayerSearchProps> = ({ autoFocus, className }) => {
  const classes = useStyles();
  const [playerName, setPlayerName] = useState('');
  const [platform, setPlatform] = useState('Steam');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const changeAccount = useChangeAccount();
  const account = useAccount();

  const handlePlayerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value.trim());
    setError(null);
    setLoading(false);
  };

  const handlePlatformChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPlatform(event.target.value as string);
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
      .catch(error => {
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
    <form className={classes.form} onSubmit={handleSubmit}>
      <Paper className={classNames(classes.paper, className)} elevation={1}>
        <Select
          className={classes.select}
          value={platform}
          onChange={handlePlatformChange}
          input={<InputBase name="platform" />}
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
        message={
          <span id="message-id">
            {formatError(error)}
            <br />
            <Typography variant="caption">Note: Player search is case-sensitive</Typography>
          </span>
        }
      />
    </form>
  );
};

export default PlayerSearch;
