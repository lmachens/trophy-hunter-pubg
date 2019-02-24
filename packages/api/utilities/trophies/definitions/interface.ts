import { ParticipantStats } from '../../pubg-api/match/interface';

export default interface Trophy {
  name: string;
  title: string;
  description: string;
  check(CheckProps): boolean;
}

interface CheckProps {
  participantStats: ParticipantStats;
}
