import React, { FunctionComponent, useState } from 'react';
import { Grid, Divider, Typography, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Match, MAPS } from 'utilities/th-api/match';
import { Trophy } from 'utilities/th-api/trophies';
import TrophyProgress from 'components/TrophyProgress';
import MatchAttributes from 'components/MatchAttributes';
import { Attributes } from 'utilities/th-api/attributes';
import millisToMinutesAndSeconds from 'utilities/millisToMinutesAndSeconds';
import timeSince from 'utilities/timeSince';

interface MatchPageProps {
  attributes: Attributes;
  match: Match;
  trophies: Trophy[];
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
  score: {
    marginBottom: theme.spacing(1)
  },
  content: {
    flex: 1,
    marginTop: theme.spacing(1)
  },
  place: {
    fontSize: '1.3rem'
  },
  placeCount: {
    fontSize: '1rem'
  }
}));

const MatchDetails: FunctionComponent<MatchPageProps> = ({ attributes, match, trophies }) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);

  const handleTabChange = (_event: React.ChangeEvent<{}>, value: any) => {
    setTab(value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.score}>
        <Typography className={classes.place}>
          #{match.playerStats.winPlace}
          <span className={classes.placeCount}>
            /{match.participantCount} | {match.playerName}
          </span>
        </Typography>
        <Typography>
          {MAPS[match.mapName]} | {millisToMinutesAndSeconds(match.duration)} |{' '}
          {timeSince(new Date(match.createdAt).getTime())} ago | {match.trophyNames.length}/
          {trophies.length} Trophies
        </Typography>
      </div>
      <Divider />
      <Tabs value={tab} onChange={handleTabChange} centered>
        <Tab label="Trophies" />
        <Tab label="Stats" />
      </Tabs>
      {tab === 0 && (
        <div className={classes.content}>
          <Grid container>
            {trophies.map(trophy => (
              <TrophyProgress
                key={trophy.name}
                trophy={trophy}
                achieved={match.trophyNames.includes(trophy.name)}
              />
            ))}
          </Grid>
        </div>
      )}
      {tab === 1 && (
        <div className={classes.content}>
          <MatchAttributes attributes={attributes} match={match} />
        </div>
      )}
    </div>
  );
};

export default MatchDetails;
