import Match from '../pubg-api/match/interface';

interface GetParticipantCountProps {
  match: Match;
}

const getParticipantCount = ({ match }: GetParticipantCountProps) => {
  return match.included.filter(doc => {
    return doc.type === 'participant';
  }).length;
};

export default getParticipantCount;
