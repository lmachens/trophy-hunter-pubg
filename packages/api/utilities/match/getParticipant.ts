import Match, { Participant } from '../pubg-api/match/interface';

interface GetParticipantProps {
  match: Match;
  playerId: string;
}

const getParticipant = ({ match, playerId }: GetParticipantProps) => {
  return match.included.find(doc => {
    return doc.type === 'participant' && doc.attributes.stats.playerId === playerId;
  }) as Participant;
};

export default getParticipant;
