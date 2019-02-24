import Match, { Participant } from '../pubg-api/match/interface';

interface GetParticipantProps {
  match: Match;
  playerName: string;
}

const getParticipant = ({ match, playerName }: GetParticipantProps) => {
  return match.included.find(doc => {
    return doc.type === 'participant' && doc.attributes.stats.name === playerName;
  }) as Participant;
};

export default getParticipant;
