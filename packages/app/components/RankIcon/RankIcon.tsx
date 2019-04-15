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
}
const getRankIcon = (rankPointsTitle: string) => {
    const [title = '0', level] = rankPointsTitle.split('-');
    let icon = rankIcons[title] || rankIcons['0'];
    if (level) {
        icon += `_0${level}`
    }

    return `/static/ranks/${icon}.png`;

}
const RankIcon: FunctionComponent<RankIconProps> = ({ rankPointsTitle }) => {
    const classes=  useStyles()
    return <img src={getRankIcon(rankPointsTitle)} className={classes.img} />
}

export default RankIcon;