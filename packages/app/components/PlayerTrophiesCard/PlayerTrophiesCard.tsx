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
        {trophies.map(trophy => (
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
