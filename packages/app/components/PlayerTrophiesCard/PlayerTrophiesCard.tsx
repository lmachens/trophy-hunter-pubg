import React, { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';
import { Trophy } from 'utilities/th-api/trophies';
import Grade from '@material-ui/icons/Grade';
import TrophyProgress from 'components/TrophyProgress';
import CardComponent from 'components/CardComponent';

interface PlayerTrophiesCardProps {
  trophies: Trophy[];
  achievedTrophies: {
    [trophyName: string]: number;
  };
}

const PlayerTrophiesCard: FunctionComponent<PlayerTrophiesCardProps> = ({
  trophies,
  achievedTrophies
}) => {
  return (
    <CardComponent headerBackgroundColor="#418c3e" title="Trophies" icon={<Grade />}>
      <Grid container justify="center">
        {trophies.map(trophy => (
          <TrophyProgress
            key={trophy.name}
            trophy={trophy}
            achieved={!!achievedTrophies[trophy.name]}
          />
        ))}
      </Grid>
    </CardComponent>
  );
};

export default PlayerTrophiesCard;
