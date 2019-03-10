import Match, { Participant } from '../pubg-api/match/interface';

interface GetGeneralStatsProps {
  match: Match;
}

export interface GeneralStats {
  mostHeadshotKills: number;
}

const getGeneralStats = ({ match }: GetGeneralStatsProps): GeneralStats => {
  const participants = match.included.filter(doc => {
    return doc.type === 'participant';
  }) as Participant[];
  const mostHeadshotKills = Math.max(
    ...participants.map(participant => participant.attributes.stats.headshotKills)
  );
  return {
    mostHeadshotKills
  };
};

export default getGeneralStats;
