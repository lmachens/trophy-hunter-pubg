import React, { FunctionComponent } from 'react';
import { Attributes } from 'utilities/th-api/attributes';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { Match } from 'utilities/th-api/match';
import formatAttribute from 'utilities/formatAttribute';

interface MatchAttributesProps {
  attributes: Attributes;
  match: Match;
}

const MatchAttributes: FunctionComponent<MatchAttributesProps> = ({ attributes, match }) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="right">Player</TableCell>
            <TableCell align="right">Min</TableCell>
            <TableCell align="right">Max</TableCell>
            <TableCell align="right">Avg</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attributes.map(attribute => (
            <TableRow key={attribute.key} hover>
              <TableCell>{attribute.title}</TableCell>
              <TableCell align="right">
                {formatAttribute(match.playerStats[attribute.key])}
              </TableCell>
              <TableCell align="right">{formatAttribute(match.minStats[attribute.key])}</TableCell>
              <TableCell align="right">{formatAttribute(match.maxStats[attribute.key])}</TableCell>
              <TableCell align="right">{formatAttribute(match.avgStats[attribute.key])}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default MatchAttributes;
