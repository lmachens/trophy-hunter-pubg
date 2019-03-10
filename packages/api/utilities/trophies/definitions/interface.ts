import { ParticipantStats } from '../../pubg-api/match/interface';

interface CheckProps {
  participantStats: ParticipantStats;
}

export default interface Trophy {
  name: string;
  title: string;
  description: string;
  svgPath: string;
  attributes: string[];
  check(props: CheckProps): boolean;
}
