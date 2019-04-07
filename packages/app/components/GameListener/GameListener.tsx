import { gameEnded, gameLaunched, gameRunning, setFeatures } from 'utilities/overwolf/games';
import React, { FunctionComponent, useState, useEffect } from 'react';
import { Snackbar } from '@material-ui/core';
import { useAccount, useChangeAccount } from 'contexts/account';
import getPlayer from 'utilities/th-api/player';
import Router from 'next/router';

const interestedInFeatures = ['me'];

const GameListener: FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const account = useAccount();
  const changeAccount = useChangeAccount();

  const handleClose = (_: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const updatePlayer = (playerName: string) => {
    if (!account || account.playerName !== playerName) {
      getPlayer({ platform: 'Steam', playerName }).then(player => {
        changeAccount({ platform: 'Steam', playerName, id: player.id });
        Router.push(`/player?platform=${player.platform}&playerId=${player.id}`);
      });
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
      overwolf.settings.registerHotKey('th_pubg', (hotkey: any) => {
        if (hotkey.status == 'success') {
          overwolf.windows.getCurrentWindow((result: any) => {
            if (result.status == 'success') {
              if (result.window.isVisible) {
                overwolf.windows.hide(result.window.id, () => {});
              } else {
                overwolf.windows.restore(result.window.id, () => {});
              }
            }
          });
        }
      });

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
