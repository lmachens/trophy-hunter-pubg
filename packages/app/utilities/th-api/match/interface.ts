export interface Match {
  platform: string;
  matchId: string;
  playerId: string;
  trophyNames: string[];
  playerStats: ParticipantStats;
  avgStats: ParticipantStats;
  maxStats: ParticipantStats;
  minStats: ParticipantStats;
  createdAt: string;
  duration: number;
  mapName: string;
  participantCount: number;
}

export interface ParticipantStats {
  [key: string]: any;
  DBNOs: number;
  assists: number;
  boosts: number;
  damageDealt: number;
  deathType: string;
  headshotKills: number;
  heals: number;
  killPlace: number;
  killPoints: number;
  killPointsDelta: number;
  killStreaks: number;
  kills: number;
  lastKillPoints: number;
  lastWinPoints: number;
  longestKill: number;
  mostDamage: number;
  name: string;
  playerId: string;
  rankPoints: number;
  revives: number;
  rideDistance: number;
  roadKills: number;
  swimDistance: number;
  teamKills: number;
  timeSurvived: number;
  vehicleDestroys: number;
  walkDistance: number;
  weaponsAcquired: number;
  winPlace: number;
  winPoints: number;
  winPointsDelta: number;
}
