import React from 'react';
import { NextFunctionComponent } from 'next';
import getTrophies, { Trophy } from 'utilities/th-api/trophies';
import { Typography, Grid, Divider } from '@material-ui/core';
import getSeasonStats, { SeasonStats } from 'utilities/th-api/season-stats';
import TrophyProgress from 'components/TrophyProgress';
import { makeStyles } from '@material-ui/styles';
import { usePlayer } from 'contexts/player';
import PlayerStats from 'components/PlayerStats';
import Error from 'next/error';

interface PlayerPageProps {
  seasonStats?: SeasonStats;
  trophies?: Trophy[];
}

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(3),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'auto'
  },
  header: {
    marginBottom: theme.spacing(1),
    fontSize: '1.3rem'
  },
  content: {
    flex: 1,
    marginTop: theme.spacing(1)
  }
}));

const PlayerPage: NextFunctionComponent<PlayerPageProps> = ({ seasonStats, trophies }) => {
  const classes = useStyles();
  const player = usePlayer();

  if (!seasonStats || !trophies || !player) {
    return <Error statusCode={400} />;
  }
  return (
    <div className={classes.container}>
      <Typography className={classes.header}>{player.name}</Typography>
      <Typography variant="caption">Note: Analysed 100 matches of current season</Typography>
      <Divider />
      <PlayerStats seasonStats={seasonStats} />
      <Grid container className={classes.content} alignContent="flex-start">
        {trophies.map(trophy => (
          <TrophyProgress
            key={trophy.name}
            trophy={trophy}
            achieved={!!seasonStats.trophies[trophy.name]}
          />
        ))}
      </Grid>
    </div>
  );
};

PlayerPage.getInitialProps = async ({ query }) => {
  const { platform, playerId, seasonId } = query;
  if (typeof platform !== 'string' || typeof playerId !== 'string' || Array.isArray(seasonId)) {
    return {};
  }

  const seasonStatsPromise = getSeasonStats({ platform, playerId, seasonId });
  const trophiesPromise = getTrophies();
  const [seasonStats, trophies] = await Promise.all([seasonStatsPromise, trophiesPromise]);
  return { seasonStats, trophies };
};

export default PlayerPage;
