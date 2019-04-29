import React from 'react';
import PlayerPage from './player';
import { NextFunctionComponent } from 'next';
import { useEffect, useState } from 'react';
import getPlayer from 'utilities/th-api/player';
import { useAccount } from 'contexts/account';
import getSeasons from 'utilities/th-api/seasons';
import getTrophies from 'utilities/th-api/trophies';
import getSeasonStats from 'utilities/th-api/season-stats';
import SearchPage from './search';
import { CircularProgress, Typography, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(2),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  note: {
    marginTop: theme.spacing(2)
  }
}));

const IndexPage: NextFunctionComponent = () => {
  const classes = useStyles();
  const account = useAccount();
  const [playerPageProps, setPlayerPageProps] = useState<null | {}>(null);

  useEffect(() => {
    if (account) {
      const { platform, playerName } = account;
      const playerPromise = getPlayer({ platform, playerName });
      const seasonsPromise = getSeasons({ platform });
      const trophiesPromise = getTrophies();

      Promise.all([playerPromise, seasonsPromise, trophiesPromise]).then(
        async ([player, seasons, trophies]) => {
          const currentSeason = seasons.find(season => season.isCurrentSeason);
          const seasonId = currentSeason!.id;
          const seasonStats = await getSeasonStats({
            platform,
            playerId: player.id,
            seasonId
          });
          setPlayerPageProps({
            seasons,
            seasonStats,
            trophies,
            seasonId,
            player
          });
        }
      );
    } else {
      setPlayerPageProps(null);
    }
  }, [account]);

  if (!account) {
    return <SearchPage />;
  }

  if (!playerPageProps) {
    return (
      <div className={classes.container}>
        <CircularProgress />
        <Typography className={classes.note}>Checking for updates</Typography>
      </div>
    );
  }

  return <PlayerPage fpp={false} {...playerPageProps} />;
};

export default IndexPage;
