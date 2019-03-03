import React, { FunctionComponent, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, InputBase, MenuItem, Paper, Select } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import getPlayer from 'utilities/th-api/player';

interface PlayerSearchProps {
  className?: string;
}

const useStyles = makeStyles({
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
  }
});

const platforms = ['PC', 'XBOX'];

const PlayerSearch: FunctionComponent<PlayerSearchProps> = ({ className }) => {
  const classes = useStyles();
  const [playerName, setPlayerName] = useState('');
  const [platform, setPlatform] = useState('PC');
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    getPlayer({ platform, playerName })
      .then(result => {
        localStorage.setItem('th-pubg-player', JSON.stringify(result));
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
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
    </form>
  );
};

export default PlayerSearch;
