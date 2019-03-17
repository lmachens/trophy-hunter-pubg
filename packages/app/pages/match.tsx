import React from 'react';
import MatchDetails from 'components/MatchDetails';
import { NextFunctionComponent } from 'next';
import getMatch, { Match } from 'utilities/th-api/match';
import getTrophies, { Trophy } from 'utilities/th-api/trophies';
import getAttributes, { Attributes } from 'utilities/th-api/attributes';

interface MatchPageProps {
  attributes: Attributes;
  match: Match;
  trophies: Trophy[];
}

const MatchPage: NextFunctionComponent<MatchPageProps> = ({ attributes, match, trophies }) => {
  return <MatchDetails attributes={attributes} match={match} trophies={trophies} />;
};

MatchPage.getInitialProps = async ({ query }) => {
  const { platform, matchId, playerId } = query;
  if (typeof platform !== 'string' || typeof matchId !== 'string' || typeof playerId !== 'string') {
    throw new Error('Invalid query');
  }

  const attributesPromise = getAttributes();
  const trophiesPromise = getTrophies();
  const matchPromise = getMatch({
    platform,
    matchId,
    playerId
  });
  const [attributes, trophies, match] = await Promise.all([
    attributesPromise,
    trophiesPromise,
    matchPromise
  ]);
  return { attributes, match, trophies };
};

export default MatchPage;
