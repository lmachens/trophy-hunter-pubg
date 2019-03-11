import { gameEnded, gameLaunched, gameRunning } from 'utilities/overwolf/games';
import React, { FunctionComponent, useState, useEffect } from 'react';
import { Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  container: {
    top: 'auto',
    bottom: 0,
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 3,
    width: '100%',
    backgroundColor: theme.palette.secondary.dark
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  snackbar: {
    position: 'absolute'
  },
  snackbarContent: {
    width: 360
  }
}));

const GameListener: FunctionComponent = () => {
  const classes = useStyles();
  const [gameInfo, setGameInfo] = useState<any>(null);

  const handleGameInfoUpdated = (gameInfoResult: any) => {
    if (gameLaunched(gameInfoResult)) {
      setGameInfo(gameInfoResult.gameInfo);
    } else if (gameEnded(gameInfoResult)) {
      setGameInfo(null);
    }
  };

  const handleRunningGameInfo = (gameInfo: any) => {
    if (gameRunning(gameInfo)) {
      setGameInfo(gameInfo);
    } else if (gameInfo) {
      setGameInfo(null);
    }
  };

  useEffect(() => {
    if (typeof overwolf !== 'undefined') {
      overwolf.games.onGameInfoUpdated.addListener(handleGameInfoUpdated);
      overwolf.games.getRunningGameInfo(handleRunningGameInfo);

      return () => {
        overwolf.games.onGameInfoUpdated.removeListener(handleGameInfoUpdated);
      };
    }
  }, []);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      open={!!gameInfo}
      ContentProps={{
        'aria-describedby': 'message-id',
        className: classes.snackbarContent
      }}
      message={<span id="message-id">{gameInfo && gameInfo.title}</span>}
      className={classes.snackbar}
    />
  );
};

export default GameListener;
