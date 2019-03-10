import definitions from './definitions';
import { ParticipantStats } from '../pubg-api/match/interface';

interface GetTrophiesProps {
  participantStats: ParticipantStats;
}

const calculateTrophies = ({ participantStats }: GetTrophiesProps) => {
  return Object.values(definitions)
    .filter(trophy => {
      return trophy.check({ participantStats });
    })
    .map(trophy => trophy.name);
};

export default calculateTrophies;
