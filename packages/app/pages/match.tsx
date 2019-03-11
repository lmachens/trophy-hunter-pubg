import React from 'react';
import MatchDetails from 'components/MatchDetails';
import { NextFunctionComponent } from 'next';
import getMatch, { Match } from 'utilities/th-api/match';
import getTrophies, { Trophy } from 'utilities/th-api/trophies';
import { Typography } from '@material-ui/core';

interface MatchPageProps {
  match?: Match;
  trophies?: Trophy[];
}

const MatchPage: NextFunctionComponent<MatchPageProps> = ({ match, trophies }) => {
  if (!match || !trophies) {
    return <Typography>Invalid query</Typography>;
  }
  return <MatchDetails match={match} trophies={trophies} />;
};

MatchPage.getInitialProps = async ({ query }) => {
  const { platform, matchId, playerId } = query;
  if (typeof platform !== 'string' || typeof matchId !== 'string' || typeof playerId !== 'string') {
    return {};
  }

  const trophiesPromise = getTrophies();
  const matchPromise = getMatch({
    platform,
    matchId,
    playerId
  });
  const [trophies, match] = await Promise.all([trophiesPromise, matchPromise]);
  return { match, trophies };
};

export default MatchPage;
