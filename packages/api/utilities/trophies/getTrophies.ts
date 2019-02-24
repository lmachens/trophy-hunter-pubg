import definitions from './definitions';
import { ParticipantStats } from '../pubg-api/match/interface';

interface GetTrophiesProps {
  participantStats: ParticipantStats;
}

const getTrophies = ({ participantStats }: GetTrophiesProps) => {
  return Object.values(definitions).filter(trophy => {
    return trophy.check({ participantStats });
  });
};

export default getTrophies;
