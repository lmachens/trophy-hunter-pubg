import React, { FunctionComponent } from 'react';
import { Card, CardHeader, CardContent, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Trophy } from 'utilities/th-api/trophies';
import Grade from '@material-ui/icons/Grade';
import TrophyProgress from 'components/TrophyProgress';

interface PlayerTrophiesCardProps {
  trophies: Trophy[];
  achievedTrophies: {
    [trophyName: string]: number;
  };
}

const useStyles = makeStyles({
  header: {
    background: '#7930e1'
  },
  content: {
    padding: 0,
    '&:last-child': {
      padding: 0
    }
  }
});

const PlayerTrophiesCard: FunctionComponent<PlayerTrophiesCardProps> = ({
  trophies,
  achievedTrophies
}) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader title="Trophies" className={classes.header} avatar={<Grade />} />
      <CardContent className={classes.content}>
        <Grid container justify="center">
          {trophies.map(trophy => (
            <TrophyProgress
              key={trophy.name}
              trophy={trophy}
              achieved={!!achievedTrophies[trophy.name]}
            />
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PlayerTrophiesCard;
