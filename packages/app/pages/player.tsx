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
  Breadcrumbs
} from '@material-ui/core';
import getSeasonStats, { SeasonStats } from 'utilities/th-api/season-stats';
import { makeStyles } from '@material-ui/styles';
import PlayerStats from 'components/PlayerStats';
import Error from 'next/error';
import getSeasons, { Season } from 'utilities/th-api/seasons';
import Router from 'next/router';
import PlayerMatchesCard from 'components/PlayerMatchesCard';
import getPlayer, { Player } from 'utilities/th-api/player';
import SearchPage from './search';
import { parseCookies } from 'nookies';
import Link from 'components/Link';
import FavoritesButton from 'components/FavoritesButton';

interface PlayerPageProps {
  fpp: boolean;
  seasons?: Season[];
  seasonStats?: SeasonStats;
  trophies?: Trophy[];
  seasonId?: string;
  player?: Player;
  showPlayerSearch: boolean;
}

const useStyles = makeStyles(theme => ({
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
  player,
  showPlayerSearch
}) => {
  if (showPlayerSearch) {
    return <SearchPage />;
  }
  const classes = useStyles();

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
        <FavoritesButton player={player} />
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
        <Typography variant="caption">Note: Analysed 100 matches of current season</Typography>
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
  let platform: string;
  let playerName: string;
  const { fpp, platform: platformQuery, playerName: playerNameQuery, seasonId } = ctx.query;
  if (
    typeof platformQuery !== 'string' ||
    typeof playerNameQuery !== 'string' ||
    Array.isArray(seasonId)
  ) {
    const { thPubg = null } = ctx.req && ctx.req.headers ? parseCookies(ctx) : parseCookies();

    if (!thPubg || Array.isArray(seasonId)) {
      return { fpp: !!fpp, showPlayerSearch: true };
    }

    const [cookiePlatform, cookieName] = thPubg.split(';');
    platform = cookiePlatform;
    playerName = cookieName;
  } else {
    platform = platformQuery;
    playerName = playerNameQuery;
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
    seasonId: seasonId || (currentSeason && currentSeason.id),
    showPlayerSearch: false
  };
};

export default PlayerPage;
