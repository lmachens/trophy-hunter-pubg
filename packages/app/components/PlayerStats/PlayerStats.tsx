import React, { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import DirectionsRun from '@material-ui/icons/DirectionsRun';
import { SeasonStats } from 'utilities/th-api/season-stats';
import PlayerStatsCard from 'components/PlayerStatsCard';
import PlayerTrophiesCard from 'components/PlayerTrophiesCard';
import { Trophy } from 'utilities/th-api/trophies';

interface PlayerStatsProps {
  seasonStats: SeasonStats;
  trophies: Trophy[];
  fpp: boolean;
}

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  icon: {
    margin: -5
  }
}));

const PlayerStats: FunctionComponent<PlayerStatsProps> = ({ trophies, seasonStats, fpp }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.container} container spacing={1}>
      <Grid item xs={12}>
        <PlayerTrophiesCard trophies={trophies} achievedTrophies={seasonStats.trophies} />
      </Grid>
      <Grid item xs>
        <PlayerStatsCard
          title="Solo"
          headerBackgroundColor="#d07812"
          icon={<DirectionsRun className={classes.icon} />}
          stats={fpp ? seasonStats.gameModeStats['solo-fpp'] : seasonStats.gameModeStats.solo}
        />
      </Grid>
      <Grid item xs>
        <PlayerStatsCard
          title="Duo"
          headerBackgroundColor="#426682"
          icon={
            <>
              <DirectionsRun className={classes.icon} />
              <DirectionsRun className={classes.icon} />
            </>
          }
          stats={fpp ? seasonStats.gameModeStats['duo-fpp'] : seasonStats.gameModeStats.duo}
        />
      </Grid>
      <Grid item xs>
        <PlayerStatsCard
          title="Squad"
          headerBackgroundColor="#12d097"
          icon={
            <>
              <DirectionsRun className={classes.icon} />
              <DirectionsRun className={classes.icon} />
              <DirectionsRun className={classes.icon} />
              <DirectionsRun className={classes.icon} />
            </>
          }
          stats={fpp ? seasonStats.gameModeStats['squad-fpp'] : seasonStats.gameModeStats.squad}
        />
      </Grid>
    </Grid>
  );
};

export default PlayerStats;
