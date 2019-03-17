import React, { FunctionComponent, useState } from 'react';
import { Grid, Divider, Typography, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Match } from 'utilities/th-api/match';
import { Trophy } from 'utilities/th-api/trophies';
import MatchTrophy from 'components/MatchTrophy';
import MatchAttributes from 'components/MatchAttributes';
import { Attributes } from 'utilities/th-api/attributes';

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
        <Typography>
          {match.trophyNames.length}/{trophies.length} Challenges Completed
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
              <MatchTrophy key={trophy.name} trophy={trophy} match={match} />
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
