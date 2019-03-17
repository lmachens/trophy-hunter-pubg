import { ParticipantStats } from '../../pubg-api/match/interface';

interface CheckProps {
  playerStats: ParticipantStats;
  avgStats: ParticipantStats;
  maxStats: ParticipantStats;
  minStats: ParticipantStats;
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
