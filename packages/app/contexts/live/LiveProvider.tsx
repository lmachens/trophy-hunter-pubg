import React, { FunctionComponent, useEffect, useState } from 'react';
import LiveContext from './LiveContext';
import { useAccount, useChangeAccount } from 'contexts/account';
import getPlayer from 'utilities/th-api/player';
import Router from 'next/router';
import { gameEnded, gameLaunched, gameRunning, setFeatures } from 'utilities/overwolf/games';
import { Game } from './interface';
import isOverwolfApp from 'utilities/overwolf/isOverwolfApp';

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
    if (playerName && (!account || account.playerName !== playerName)) {
      getPlayer({ platform: 'Steam', playerName }).then(player => {
        changeAccount({
          platform: 'Steam',
          playerName,
          recentMatch: player.matches[0]
        });
        Router.push(`/player?platform=${player.platform}&playerName=${player.name}`);
      });
    }
  };
  const handleInfoUpdate = (infoUpdate: any) => {
    console.log('handleInfoUpdate', infoUpdate);
    if (infoUpdate.info && infoUpdate.info.me) {
      updatePlayer(infoUpdate.info.me.name);
    }
    if (infoUpdate.info.match_info) {
      setMatch({
        ...match,
        trophyNames: [],
        playerStats: {},
        minStats: {},
        maxStats: {},
        avgStats: {},
        mapName: infoUpdate.info.match_info.map,
        playerName: infoUpdate.info.me.name
      });
    }
  };

  const handleInfo = ({ status, res }: any) => {
    console.log('handleInfo', status, res);
    if (status === 'success' && res.me) {
      updatePlayer(res.me.name);
    }
    if (status === 'success' && res.match_info) {
      setMatch({
        ...match,
        trophyNames: [],
        playerStats: {},
        minStats: {},
        maxStats: {},
        avgStats: {},
        mapName: res.match_info.map,
        playerName: res.me.name
      });
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
    if (isOverwolfApp) {
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
