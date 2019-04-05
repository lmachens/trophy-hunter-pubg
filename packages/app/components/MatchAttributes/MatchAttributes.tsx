import React, { FunctionComponent } from 'react';
import { Attributes, Attribute } from 'utilities/th-api/attributes';
import { Table, TableHead, TableRow, TableCell, TableBody, Tooltip } from '@material-ui/core';
import { Match } from 'utilities/th-api/match';
import formatAttribute from 'utilities/formatAttribute';
import { makeStyles } from '@material-ui/styles';
import Grade from '@material-ui/icons/Grade';
import CardComponent from 'components/CardComponent';

interface MatchAttributesProps {
  attributes: Attributes;
  match: Match;
}

const useStyles = makeStyles(theme => ({
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

const MatchAttributes: FunctionComponent<MatchAttributesProps> = ({ attributes, match }) => {
  const classes = useStyles();

  return (
    <CardComponent headerBackgroundColor="#3094be" title="Stats" icon={<Grade />}>
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
              <TableRow hover>
                <TableCell>{attribute.title}</TableCell>
                <TableCell className={classes.player} align="right">
                  {formatAttribute(match.playerStats[attribute.key])}
                </TableCell>
                <TableCell align="right">
                  {formatAttribute(match.minStats[attribute.key])}
                </TableCell>
                <TableCell align="right">
                  {formatAttribute(match.maxStats[attribute.key])}
                </TableCell>
                <TableCell align="right">
                  {formatAttribute(match.avgStats[attribute.key])}
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
