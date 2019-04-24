import React, { FunctionComponent } from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Grid,
  Tooltip
} from '@material-ui/core';
import { GameModeStats } from 'utilities/th-api/season-stats';
import { makeStyles } from '@material-ui/styles';
import millisToMinutesAndSeconds from 'utilities/millisToMinutesAndSeconds';
import CardComponent from 'components/CardComponent';
import RankIcon from 'components/RankIcon';

interface PlayerStatsCardProps {
  stats: GameModeStats;
  title: string;
  headerBackgroundColor: string;
  icon: React.ReactNode;
}

const useStyles = makeStyles(theme => ({
  row: {
    backgroundColor: '#444',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.paper
    }
  },
  colBorder: {
    borderRight: `1px solid #555555`
  },
  caption: {
    color: theme.typography.caption.color,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      whiteSpace: 'normal'
    }
  },
  rank: {
    margin: 0,
    width: '100%'
  }
}));

const PlayerStatsCard: FunctionComponent<PlayerStatsCardProps> = ({
  stats,
  title,
  headerBackgroundColor,
  icon
}) => {
  const classes = useStyles();

  return (
    <CardComponent headerBackgroundColor={headerBackgroundColor} title={title} icon={icon}>
      <Grid
        className={classes.rank}
        container
        alignItems="center"
        justify="space-between"
        spacing={2}
      >
        <Grid item>
          <RankIcon rankPointsTitle={stats.rankPointsTitle} />
        </Grid>
        <Grid item>
          <Tooltip title="Survival Points">
            <Typography variant="h4">{stats.rankPoints.toFixed()} SP</Typography>
          </Tooltip>
        </Grid>
        <Grid item>
          <Typography variant="h6">{stats.roundsPlayed} Games</Typography>
        </Grid>
      </Grid>
      <Table>
        <TableBody>
          <TableRow className={classes.row}>
            <TableCell className={classes.caption}>Win %</TableCell>
            <TableCell className={classes.colBorder}>
              {((stats.wins / stats.roundsPlayed) * 100 || 0).toFixed(1)}%
            </TableCell>
            <TableCell className={classes.caption}>Top 10%</TableCell>
            <TableCell>{((stats.top10s / stats.roundsPlayed) * 100 || 0).toFixed(1)}%</TableCell>
          </TableRow>
          <TableRow className={classes.row}>
            <TableCell className={classes.caption}>Longest Kill</TableCell>
            <TableCell className={classes.colBorder}>{stats.longestKill.toFixed(1)}m</TableCell>
            <TableCell className={classes.caption}>Headshot</TableCell>
            <TableCell>{((stats.headshotKills / stats.kills) * 100 || 0).toFixed(1)}%</TableCell>
          </TableRow>
          <TableRow className={classes.row}>
            <TableCell className={classes.caption}>Avg. Damage</TableCell>
            <TableCell className={classes.colBorder}>
              {(stats.damageDealt / stats.roundsPlayed || 0).toFixed(1)}
            </TableCell>
            <TableCell className={classes.caption}>Avg. Boosts</TableCell>
            <TableCell> {(stats.boosts / stats.roundsPlayed || 0).toFixed(1)}</TableCell>
          </TableRow>
          <TableRow className={classes.row}>
            <TableCell className={classes.caption}>Avg. Rank</TableCell>
            <TableCell className={classes.colBorder}>#{stats.avgRank.toFixed(1)}</TableCell>
            <TableCell className={classes.caption}>Avg. Survived Time</TableCell>
            <TableCell>
              {millisToMinutesAndSeconds(stats.timeSurvived / stats.roundsPlayed)}
            </TableCell>
          </TableRow>
          <TableRow className={classes.row}>
            <TableCell className={classes.caption}>KDA</TableCell>
            <TableCell className={classes.colBorder}>
              {(
                Math.round(((stats.kills + stats.assists) / stats.losses) * 100) / 100 || 0
              ).toFixed(2)}
            </TableCell>
            <TableCell className={classes.caption}>Most Kills</TableCell>
            <TableCell>{stats.roundMostKills}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardComponent>
  );
};

export default PlayerStatsCard;
