import Match, { Participant } from '../pubg-api/match/interface';

interface GetParticipantProps {
  match: Match;
  playerName?: string;
  playerId?: string;
}

const getParticipant = ({ match, playerName, playerId }: GetParticipantProps) => {
  return match.included.find(doc => {
    return (
      doc.type === 'participant' &&
      (playerName
        ? doc.attributes.stats.name === playerName
        : doc.attributes.stats.playerId === playerId)
    );
  }) as Participant;
};

export default getParticipant;
