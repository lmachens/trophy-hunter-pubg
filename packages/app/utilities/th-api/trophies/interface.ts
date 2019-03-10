export interface Trophy {
  name: string;
  title: string;
  description: string;
  attributes: {
    key: Attributes;
    text: string;
  }[];
  svgPath: string;
}

type Attributes =
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
