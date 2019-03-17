import definitions from './definitions';
import { ParticipantStats } from '../pubg-api/match/interface';

interface GetTrophiesProps {
  playerStats: ParticipantStats;
  avgStats: ParticipantStats;
  maxStats: ParticipantStats;
  minStats: ParticipantStats;
}

const calculateTrophies = ({ playerStats, avgStats, maxStats, minStats }: GetTrophiesProps) => {
  return Object.values(definitions)
    .filter(trophy => {
      return trophy.check({ playerStats, avgStats, maxStats, minStats });
    })
    .map(trophy => trophy.name);
};

export default calculateTrophies;
