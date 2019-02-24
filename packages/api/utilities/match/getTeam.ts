import Match, { Participant, Roster } from '../pubg-api/match/interface';

interface GetTeamProps {
  match: Match;
  participant: Participant;
}

const getTeam = ({ match, participant }: GetTeamProps) => {
  return match.included.find(doc => {
    return (
      doc.type === 'roster' &&
      !!doc.relationships.participants.data.find(
        teamParticipant => teamParticipant.id === participant.id
      )
    );
  }) as Roster;
};

export default getTeam;
