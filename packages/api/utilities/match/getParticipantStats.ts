import { Participant, ParticipantStats } from '../pubg-api/match/interface';

interface GetParticipantStatsProps {
  participant: Participant;
}

const getParticipantStats = ({ participant }: GetParticipantStatsProps): ParticipantStats => {
  const { stats } = participant.attributes;
  const killParticipation = stats.kills + stats.assists;
  const participantStats = { ...stats, killParticipation };
  delete participantStats.name;
  delete participantStats.playerId;
  return participantStats;
};

export default getParticipantStats;
