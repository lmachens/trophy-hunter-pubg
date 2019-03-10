import { ParticipantStats } from '../../pubg-api/match/interface';

interface CheckProps {
  participantStats: ParticipantStats;
}

export default interface Trophy {
  name: string;
  title: string;
  description: string;
  svgPath: string;
  attributes: {
    key: Attributes;
    text: string;
  }[];
  check(props: CheckProps): boolean;
}

export type Attributes =
  | 'DBNOs'
  | 'assists'
  | 'boosts'
  | 'damageDealt'
  | 'deathType'
  | 'headshotKills'
  | 'heals'
  | 'killPlace'
  | 'killPoints'
  | 'killPointsDelta'
  | 'killStreaks'
  | 'kills'
  | 'lastKillPoints'
  | 'lastWinPoints'
  | 'longestKill'
  | 'mostDamage'
  | 'name'
  | 'playerId'
  | 'rankPoints'
  | 'revives'
  | 'rideDistance'
  | 'roadKills'
  | 'swimDistance'
  | 'teamKills'
  | 'timeSurvived'
  | 'vehicleDestroys'
  | 'walkDistance'
  | 'weaponsAcquired'
  | 'winPlace'
  | 'winPoints'
  | 'winPointsDelta';
