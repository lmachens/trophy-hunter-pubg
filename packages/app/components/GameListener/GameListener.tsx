import { gameEnded, gameLaunched, gameRunning, setFeatures } from 'utilities/overwolf/games';
import React, { FunctionComponent, useState, useEffect } from 'react';
import { Snackbar } from '@material-ui/core';
import { usePlayer, useRefreshPlayer } from 'contexts/player';

const interestedInFeatures = ['me'];

const GameListener: FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const player = usePlayer();
  const refreshPlayer = useRefreshPlayer();

  const handleClose = (_: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const updatePlayer = (playerName: string) => {
    if (!player || player.name !== name) {
      refreshPlayer({ platform: 'Steam', playerName });
    }
  };
  const handleInfoUpdate = (infoUpdate: any) => {
    if (infoUpdate.info.me) {
      updatePlayer(infoUpdate.info.me.name);
    }
  };

  const handleInfo = ({ status, res }: any) => {
    if (status === 'success' && res.me) {
      updatePlayer(res.me.name);
    }
  };

  const startListening = () => {
    overwolf.games.events.onInfoUpdates2.addListener(handleInfoUpdate);
    setTimeout(() => setFeatures(interestedInFeatures), 1000);
    overwolf.games.events.getInfo(handleInfo);
  };

  const handleGameInfoUpdated = (gameInfoResult: any) => {
    if (gameLaunched(gameInfoResult)) {
      setOpen(true);
      startListening();
    } else if (gameEnded(gameInfoResult)) {
      setOpen(false);
    }
  };

  const handleRunningGameInfo = (gameInfo: any) => {
    if (gameRunning(gameInfo)) {
      setOpen(true);
      startListening();
    } else if (gameInfo) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (typeof overwolf !== 'undefined') {
      overwolf.games.onGameInfoUpdated.addListener(handleGameInfoUpdated);
      overwolf.games.getRunningGameInfo(handleRunningGameInfo);

      return () => {
        overwolf.games.onGameInfoUpdated.removeListener(handleGameInfoUpdated);
        overwolf.games.events.onInfoUpdates2.removeListener(handleInfoUpdate);
      };
    }
  }, []);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}
      message={<span id="message-id">Have fun playing PUBG!</span>}
    />
  );
};

export default GameListener;
