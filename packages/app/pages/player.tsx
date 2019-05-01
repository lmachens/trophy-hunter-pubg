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
  Grid,
  Breadcrumbs,
  Theme
} from '@material-ui/core';
import getSeasonStats, { SeasonStats } from 'utilities/th-api/season-stats';
import { makeStyles } from '@material-ui/styles';
import PlayerStats from 'components/PlayerStats';
import Error from 'next/error';
import getSeasons, { Season } from 'utilities/th-api/seasons';
import Router from 'next/router';
import PlayerMatchesCard from 'components/PlayerMatchesCard';
import getPlayer, { Player } from 'utilities/th-api/player';
import Link from 'components/Link';
import ImpersonateButton from 'components/ImpersonateButton';

interface PlayerPageProps {
  fpp: boolean;
  seasons?: Season[];
  seasonStats?: SeasonStats;
  trophies?: Trophy[];
  seasonId?: string;
  player?: Player;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    margin: theme.spacing(2)
  },
  header: {
    marginBottom: theme.spacing(1),
    fontSize: '1.3rem'
  },
  content: {
    flex: 1,
    marginTop: theme.spacing(1)
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between'
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
  seasonId,
  player
}) => {
  const classes = useStyles();

  if (!seasons || !seasonStats || !trophies || !player) {
    return <Error statusCode={400} />;
  }
  const handleSeasonChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    Router.push({
      pathname: '/player',
      query: {
        platform: player.platform,
        playerName: player.name,
        seasonId: event.target.value as string
      }
    });
  };
  const handleFppChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query: Record<string, string | string[] | undefined> = {
      platform: player.platform,
      playerName: player.name
    };
    if (event.target.checked) {
      query.fpp = 'true';
    } else {
      delete query.fpp;
    }
    Router.push({
      pathname: '/player',
      query
    });
  };

  return (
    <Grid container spacing={2} className={classes.container} alignContent="flex-start">
      <Grid item xs={12} className={classes.top}>
        <Breadcrumbs aria-label="Breadcrumb">
          <Link
            color="textPrimary"
            aria-current="page"
            href={`/player?platform=${player.platform}&playerName=${player.name}`}
          >
            {player.name}
          </Link>
        </Breadcrumbs>
        <ImpersonateButton player={player} />
      </Grid>
      <Grid item xs={12}>
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
        <Typography variant="caption">Note: Analysed matches of the last 14 days only</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <PlayerStats seasonStats={seasonStats} trophies={trophies} fpp={fpp} />
      </Grid>
      <Grid item xs={12}>
        <PlayerMatchesCard player={player} trophies={trophies} />
      </Grid>
    </Grid>
  );
};

PlayerPage.getInitialProps = async ctx => {
  const { fpp, platform, playerName, seasonId } = ctx.query;
  if (typeof platform !== 'string' || typeof playerName !== 'string' || Array.isArray(seasonId)) {
    return { fpp: false };
  }

  const playerPromise = getPlayer({ platform, playerName });
  const seasonsPromise = getSeasons({ platform });

  const trophiesPromise = getTrophies();
  const [player, seasons, trophies] = await Promise.all([
    playerPromise,
    seasonsPromise,
    trophiesPromise
  ]);
  const currentSeason = seasons.find(season => season.isCurrentSeason);
  const seasonStats = await getSeasonStats({
    platform,
    playerId: player.id,
    seasonId: seasonId || currentSeason!.id
  });

  return {
    fpp: !!fpp,
    player,
    seasons,
    seasonStats,
    trophies,
    seasonId: seasonId || (currentSeason && currentSeason.id)
  };
};

export default PlayerPage;
