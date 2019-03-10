import React, { FunctionComponent } from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import { Trophy } from 'utilities/th-api/trophies';

interface TrophyIconProps extends SvgIconProps {
  trophy: Trophy;
}

const TrophyIcon: FunctionComponent<TrophyIconProps> = ({ trophy, ...other }) => {
  return (
    <SvgIcon viewBox="0 0 512 512" {...other}>
      <path d={trophy.svgPath} />
    </SvgIcon>
  );
};

export default TrophyIcon;
