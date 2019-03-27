import React, { FunctionComponent, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, InputBase, MenuItem, Paper, Select, Snackbar } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import getPlayer from 'utilities/th-api/player';
import { useRefreshPlayer } from 'contexts/player';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundImage: 'url(/static/backgrounds/main.jpg)',
    backgroundPosition: 'center right',
    backgroundSize: 'cover',
    padding: theme.spacing(3),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  form: {
    position: 'relative'
  },
  logo: {
    maxWidth: 350,
    position: 'absolute',
    top: -140,
    left: 0,
    right: 0,
    margin: '0 auto'
  },
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    maxWidth: '90vw',
    backgroundColor: '#1d1c1dc7'
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.common.white
  }
}));

const platforms = ['Steam', 'PSN', 'XBOX', 'Kakao'];

const PlayerSearch: FunctionComponent = () => {
  const classes = useStyles();
  const [playerName, setPlayerName] = useState('');
  const [platform, setPlatform] = useState('Steam');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const refreshPlayer = useRefreshPlayer();

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
      .then(() => {
        refreshPlayer({ platform, playerName });
        setLoading(false);
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
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <img className={classes.logo} src="/static/logo.png" />
        <Paper className={classes.paper} elevation={1}>
          <Select
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
            autoFocus
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
    </div>
  );
};

export default PlayerSearch;
