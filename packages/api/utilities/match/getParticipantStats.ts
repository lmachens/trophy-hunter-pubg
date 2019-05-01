import { Participant, ParticipantStats } from '../pubg-api/match/interface';

interface GetParticipantStatsProps {
  participant: Participant;
}

const getParticipantStats = ({ participant }: GetParticipantStatsProps): ParticipantStats => {
  const { stats } = participant.attributes;
  const killParticipation = stats.kills + stats.assists;
  const avgKillDamage = stats.kills > 0 ? stats.damageDealt / stats.kills : NaN;
  const participantStats = { ...stats, killParticipation, avgKillDamage };
  delete participantStats.name;
  delete participantStats.playerId;
  return participantStats;
};

export default getParticipantStats;
