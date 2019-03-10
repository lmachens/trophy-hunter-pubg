import definitions from './definitions';
import { ParticipantStats } from '../pubg-api/match/interface';
import { GeneralStats } from 'utilities/match/getGeneralStats';

interface GetTrophiesProps {
  participantStats: ParticipantStats;
  generalStats: GeneralStats;
}

const calculateTrophies = ({ participantStats, generalStats }: GetTrophiesProps) => {
  return Object.values(definitions)
    .filter(trophy => {
      return trophy.check({ participantStats, generalStats });
    })
    .map(trophy => trophy.name);
};

export default calculateTrophies;
