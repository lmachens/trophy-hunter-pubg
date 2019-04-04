import React from 'react';
import { NextFunctionComponent } from 'next';
import getTrophies, { Trophy } from 'utilities/th-api/trophies';
import {
  Typography,
  Divider,
  Select,
  Input,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Grid
} from '@material-ui/core';
import getSeasonStats, { SeasonStats } from 'utilities/th-api/season-stats';
import { makeStyles } from '@material-ui/styles';
import { usePlayer } from 'contexts/player';
import PlayerStats from 'components/PlayerStats';
import Error from 'next/error';
import getSeasons, { Season } from 'utilities/th-api/seasons';
import Router from 'next/router';

interface PlayerPageProps {
  fpp: boolean;
  seasons?: Season[];
  seasonStats?: SeasonStats;
  trophies?: Trophy[];
  seasonId?: string;
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

const formatSeason = (season: Season) => {
  const month = season.id.substr(season.id.length - 2).replace('0', '');
  const year = season.id.substr(season.id.length - 7, 4);

  if (/pc-/.test(season.id)) {
    return `Beta Season ${month}`;
  } else {
    return `${year} Season ${month}`;
  }
};
const filterSeasons = (season: Season) => !/2017/.test(season.id);
const sortSeasons = (a: Season, b: Season) => {
  if (a.isCurrentSeason || a.id > b.id) {
    return -1;
  } else if (a.id < b.id) {
    return 1;
  }
  return 0;
};

const PlayerPage: NextFunctionComponent<PlayerPageProps> = ({
  fpp,
  seasons,
  seasonStats,
  trophies,
  seasonId
}) => {
  const classes = useStyles();
  const player = usePlayer();

  if (!seasons || !seasonStats || !trophies || !player) {
    return <Error statusCode={400} />;
  }
  const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    Router.push({
      pathname: Router.pathname,
      query: { ...Router.query, seasonId: event.target.value }
    });
  };
  const handleFppChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query: Record<string, string | string[] | undefined> = { ...Router.query };
    if (event.target.checked) {
      query.fpp = 'true';
    } else {
      delete query.fpp;
    }
    Router.push({
      pathname: Router.pathname,
      query
    });
  };

  return (
    <div className={classes.container}>
      <Typography className={classes.header}>{player.name}</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Select
            value={seasonId}
            onChange={handleSeasonChange}
            input={<Input name="seasonId" id="season-id" />}
          >
            {seasons
              .filter(filterSeasons)
              .sort(sortSeasons)
              .map(season => (
                <MenuItem key={season.id} value={season.id}>
                  {formatSeason(season)}
                </MenuItem>
              ))}
          </Select>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<Checkbox checked={fpp} onChange={handleFppChange} color="primary" />}
            label="FPP"
          />
        </Grid>
      </Grid>
      <Typography variant="caption">Note: Analysed 100 matches of current season</Typography>
      <Divider />
      <PlayerStats seasonStats={seasonStats} trophies={trophies} fpp={fpp} />
    </div>
  );
};

PlayerPage.getInitialProps = async ({ query }) => {
  const { fpp, platform, playerId, seasonId } = query;
  if (typeof platform !== 'string' || typeof playerId !== 'string' || Array.isArray(seasonId)) {
    return { fpp: !!fpp };
  }

  const seasonsPromise = getSeasons({ platform });
  const seasonStatsPromise = getSeasonStats({ platform, playerId, seasonId });
  const trophiesPromise = getTrophies();
  const [seasons, seasonStats, trophies] = await Promise.all([
    seasonsPromise,
    seasonStatsPromise,
    trophiesPromise
  ]);
  const currentSeason = seasons.find(season => season.isCurrentSeason);

  return {
    fpp: !!fpp,
    seasons,
    seasonStats,
    trophies,
    seasonId: seasonId || (currentSeason && currentSeason.id)
  };
};

export default PlayerPage;
