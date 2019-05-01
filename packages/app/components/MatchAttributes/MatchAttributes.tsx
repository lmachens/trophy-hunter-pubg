import React, { FunctionComponent } from 'react';
import { Attributes, Attribute } from 'utilities/th-api/attributes';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  Theme
} from '@material-ui/core';
import { Match } from 'utilities/th-api/match';
import formatAttribute from 'utilities/formatAttribute';
import { makeStyles } from '@material-ui/styles';
import BarChart from '@material-ui/icons/BarChart';
import CardComponent from 'components/CardComponent';
import { Trophy } from 'utilities/th-api/trophies';

interface MatchAttributesProps {
  attributes: Attributes;
  match?: Match;
  trophy?: Trophy;
  onHoverStart?(attribute: Attribute): void;
  onHoverEnd?(): void;
}

const useStyles = makeStyles((theme: Theme) => ({
  player: {
    color: theme.palette.primary.main
  }
}));

const handleSort = (a: Attribute, b: Attribute) => {
  if (a.title < b.title) {
    return -1;
  } else if (a.title > b.title) {
    return 1;
  }
  return 0;
};

const MatchAttributes: FunctionComponent<MatchAttributesProps> = ({
  attributes,
  match,
  trophy,
  onHoverStart,
  onHoverEnd
}) => {
  const classes = useStyles();

  const handleMouseEnter = (attribute: Attribute) => () => {
    if (onHoverStart) onHoverStart(attribute);
  };

  const handleMouseLeave = () => {
    if (onHoverEnd) onHoverEnd();
  };

  return (
    <CardComponent headerBackgroundColor="#3094be" title="Stats" icon={<BarChart />}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell className={classes.player} align="right">
              Player
            </TableCell>
            <TableCell align="right">Min</TableCell>
            <TableCell align="right">Max</TableCell>
            <TableCell align="right">Avg</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attributes.sort(handleSort).map(attribute => (
            <Tooltip key={attribute.key} title={attribute.subtitle} enterDelay={200}>
              <TableRow
                hover
                selected={trophy && trophy.attributes.includes(attribute.key)}
                onMouseEnter={onHoverStart && handleMouseEnter(attribute)}
                onMouseLeave={onHoverEnd && handleMouseLeave}
              >
                <TableCell>{attribute.title}</TableCell>
                <TableCell className={classes.player} align="right">
                  {formatAttribute(match ? match.playerStats[attribute.key] : '')}
                </TableCell>
                <TableCell align="right">
                  {formatAttribute(match ? match.minStats[attribute.key] : '')}
                </TableCell>
                <TableCell align="right">
                  {formatAttribute(match ? match.maxStats[attribute.key] : '')}
                </TableCell>
                <TableCell align="right">
                  {formatAttribute(match ? match.avgStats[attribute.key] : '', 1)}
                </TableCell>
              </TableRow>
            </Tooltip>
          ))}
        </TableBody>
      </Table>
    </CardComponent>
  );
};

export default MatchAttributes;
