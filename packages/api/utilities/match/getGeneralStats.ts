import Match, { Participant, ParticipantStats } from '../pubg-api/match/interface';
import getParticipantStats from './getParticipantStats';

interface GetGeneralStatsProps {
  match: Match;
  playerStats: ParticipantStats;
}

export interface GeneralStats {
  maxStats: ParticipantStats;
  minStats: ParticipantStats;
  avgStats: ParticipantStats;
}

const getGeneralStats = ({ match, playerStats }: GetGeneralStatsProps): GeneralStats => {
  const participants = match.included.filter(doc => {
    return doc.type === 'participant';
  }) as Participant[];
  const participantStats = participants.map(participant => getParticipantStats({ participant }));
  const stats = Object.keys(playerStats).reduce(
    (stats, key) => {
      const allStats = participantStats.map(stats => stats[key]);

      const max = Math.max(...allStats);
      const min = Math.min(...allStats);
      const sum = allStats.reduce((a, b) => a + b);
      const avg = sum / allStats.length;
      return {
        maxStats: { ...stats.maxStats, [key]: max },
        minStats: { ...stats.minStats, [key]: min },
        avgStats: { ...stats.avgStats, [key]: avg }
      };
    },
    {
      maxStats: {},
      minStats: {},
      avgStats: {}
    }
  ) as GeneralStats;

  return stats;
};

export default getGeneralStats;
