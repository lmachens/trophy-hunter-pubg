import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/styles';

interface RankIconProps {
  rankPointsTitle: string;
}

const useStyles = makeStyles({
  img: {
    width: 80,
    height: 80
  }
});

const rankIcons: {
  [index: string]: string;
} = {
  '0': 'Unknown',
  '1': 'Beginner',
  '2': 'Novice',
  '3': 'Experienced',
  '4': 'Skilled',
  '5': 'Specialist',
  '6': 'Expert',
  '7': 'Survivor',
  '8': 'Lone_Survivor'
};
const getRankIcon = (rankPointsTitle: string) => {
  const [title = '0', level] = rankPointsTitle.split('-');
  let icon = rankIcons[title] || rankIcons['0'];
  if (level && level !== '0') {
    icon += `_0${level}`;
  }
  return icon;
};

const RankIcon: FunctionComponent<RankIconProps> = ({ rankPointsTitle }) => {
  const classes = useStyles();
  const icon = getRankIcon(rankPointsTitle);
  return (
    <picture>
      <source srcSet={`/static/ranks/${icon}.webp`} type="image/webp" />
      <source srcSet={`/static/legacy/ranks/${icon}.png`} type="image/png" />
      <img src={`/static/ranks/${icon}.webp`} className={classes.img} alt="Rank" />
    </picture>
  );
};

export default RankIcon;
