import React, { FunctionComponent, useEffect, useState } from 'react';
import LiveContext from './LiveContext';
import { useAccount, useChangeAccount } from 'contexts/account';
import getPlayer from 'utilities/th-api/player';
import Router from 'next/router';
import { gameEnded, gameLaunched, gameRunning, setFeatures } from 'utilities/overwolf/games';
import { Game } from './interface';

const interestedInFeatures = [
  'me',
  'kill',
  'match',
  'rank',
  'phase',
  'map',
  'revived',
  'death',
  'killer'
];

const LiveProvider: FunctionComponent = ({ children }) => {
  const account = useAccount();
  const changeAccount = useChangeAccount();
  const [game, setGame] = useState<Game>();
  const [match, setMatch] = useState();

  const updatePlayer = (playerName: string) => {
    if (!account || account.playerName !== playerName) {
      getPlayer({ platform: 'Steam', playerName }).then(player => {
        changeAccount({ platform: 'Steam', playerName, id: player.id });
        Router.push(`/player?platform=${player.platform}&playerId=${player.id}`);
      });
    }
  };
  const handleInfoUpdate = (infoUpdate: any) => {
    console.log('handleInfoUpdate', infoUpdate);
    if (infoUpdate.info && infoUpdate.info.me) {
      updatePlayer(infoUpdate.info.me.name);
      setMatch({
        ...match,
        playerName: infoUpdate.info.me.name
      });
    }
  };

  const handleInfo = ({ status, res }: any) => {
    console.log('handleInfo', status, res);
    if (status === 'success' && res && res.me) {
      updatePlayer(res.me.name);
    }
  };

  const startListening = () => {
    overwolf.games.events.onInfoUpdates2.addListener(handleInfoUpdate);
    setTimeout(() => setFeatures(interestedInFeatures), 1000);
    overwolf.games.events.getInfo(handleInfo);
  };

  const stopListening = () => {
    overwolf.games.events.onInfoUpdates2.removeListener(handleInfoUpdate);
  };

  const handleGameInfoUpdated = (gameInfoResult: any) => {
    console.log('handleGameInfoUpdated', gameInfoResult);
    if (gameLaunched(gameInfoResult)) {
      startListening();
      setGame({
        startedAt: new Date(),
        displayName: gameInfoResult.gameInfo.displayName
      });
    } else if (gameEnded(gameInfoResult)) {
      stopListening();
      setGame(undefined);
    }
  };

  const handleRunningGameInfo = (gameInfo: any) => {
    console.log('handleRunningGameInfo', gameInfo);
    if (gameRunning(gameInfo)) {
      startListening();
      setGame({
        startedAt: new Date(),
        displayName: gameInfo.displayName
      });
    } else if (gameInfo) {
      stopListening();
      setGame(undefined);
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
        stopListening();
      };
    }
  }, []);

  const value = {
    match,
    game
  };
  return <LiveContext.Provider value={value}>{children}</LiveContext.Provider>;
};

export default LiveProvider;
