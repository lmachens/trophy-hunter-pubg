import React, { FunctionComponent, useState } from 'react';
import { Grid, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import TrophyIcon from 'components/TrophyIcon';
import DoneIcon from '@material-ui/icons/Done';
import { Trophy } from 'utilities/th-api/trophies';
import { Match } from 'utilities/th-api/match';

interface MatchTrophyProps {
  trophy: Trophy;
  match: Match;
  defaultDetails?: boolean;
}

const useStyles = makeStyles(theme => ({
  item: {
    background: '#444',
    position: 'relative',
    margin: 1,
    width: 110,
    height: 110,
    cursor: 'pointer'
  },
  achieved: {},
  trophy: {
    margin: 4,
    width: 100,
    height: 100
  },
  doneIcon: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    borderRadius: '30%',
    backgroundColor: theme.palette.secondary.main
  },
  details: {
    padding: theme.spacing(1),
    maxHeight: '100%',
    overflowY: 'auto'
  }
}));

const formatAttribute = (attribute: number | string) => {
  if (typeof attribute === 'number') {
    return Math.floor(attribute);
  }
  return attribute;
};

const getProperty = (propertyName: string, object: any) => {
  const parts = propertyName.split('.');
  let property = object;

  for (let i = 0; i < parts.length; i++) {
    if (!property) {
      return undefined;
    }
    property = property[parts[i]];
  }

  return property;
};

const MatchTrophy: FunctionComponent<MatchTrophyProps> = ({
  trophy,
  match,
  defaultDetails = false
}) => {
  const classes = useStyles();
  const [details, setDetails] = useState(defaultDetails);

  const achieved = match.trophyNames.includes(trophy.name);
  const toggleDetails = () => {
    setDetails(!details);
  };

  return (
    <Tooltip title={trophy.description}>
      <Grid
        item
        className={classNames(classes.item, {
          [classes.achieved]: achieved
        })}
        onClick={toggleDetails}
      >
        {details && (
          <div className={classes.details}>
            <Typography variant="subtitle2">{trophy.title}</Typography>
            {trophy.attributes.map(attribute => (
              <Typography key={attribute.key}>
                {formatAttribute(getProperty(attribute.key, match))} {attribute.unit}
              </Typography>
            ))}
          </div>
        )}
        {!details && (
          <TrophyIcon
            className={classes.trophy}
            trophy={trophy}
            color={achieved ? 'inherit' : 'disabled'}
          />
        )}
        {achieved && <DoneIcon className={classes.doneIcon} />}
      </Grid>
    </Tooltip>
  );
};

export default MatchTrophy;
