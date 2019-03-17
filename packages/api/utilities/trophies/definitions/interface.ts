import { ParticipantStats } from '../../pubg-api/match/interface';
import { GeneralStats } from 'utilities/match/getGeneralStats';

interface CheckProps {
  participantStats: ParticipantStats;
  generalStats: GeneralStats;
}

type Check = (props: CheckProps) => boolean;

export default interface Trophy {
  name: string;
  title: string;
  author: string;
  description: string;
  src: string;
  svgPath: string;
  attributes: string[];
  check: Check;
}
