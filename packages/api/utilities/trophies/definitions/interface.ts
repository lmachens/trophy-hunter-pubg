import { ParticipantStats } from '../../pubg-api/match/interface';
import { GeneralStats } from 'utilities/match/getGeneralStats';

interface CheckProps {
  participantStats: ParticipantStats;
  generalStats: GeneralStats;
}

export default interface Trophy {
  name: string;
  title: string;
  description: string;
  svgPath: string;
  attributes: string[];
  check(props: CheckProps): boolean;
}
