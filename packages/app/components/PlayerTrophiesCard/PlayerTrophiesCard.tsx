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
  onHoverStart?(trophy: Trophy): void;
  onHoverEnd?(): void;
}

const sortTrophies = (a: Trophy, b: Trophy) => {
  if (a.title > b.title) {
    return 1;
  } else if (a.title < b.title) {
    return -1;
  }
  return 0;
};

const PlayerTrophiesCard: FunctionComponent<PlayerTrophiesCardProps> = ({
  trophies,
  achievedTrophies,
  onHoverStart,
  onHoverEnd
}) => {
  const handleMouseEnter = (trophy: Trophy) => () => {
    if (onHoverStart) onHoverStart(trophy);
  };

  const handleMouseLeave = () => {
    if (onHoverEnd) onHoverEnd();
  };

  return (
    <CardComponent headerBackgroundColor="#418c3e" title="Trophies" icon={<Grade />}>
      <Grid container justify="center">
        {trophies.sort(sortTrophies).map(trophy => (
          <div
            key={trophy.name}
            onMouseEnter={onHoverStart && handleMouseEnter(trophy)}
            onMouseLeave={onHoverEnd && handleMouseLeave}
          >
            <TrophyProgress trophy={trophy} achieved={!!achievedTrophies[trophy.name]} />
          </div>
        ))}
      </Grid>
    </CardComponent>
  );
};

export default PlayerTrophiesCard;
