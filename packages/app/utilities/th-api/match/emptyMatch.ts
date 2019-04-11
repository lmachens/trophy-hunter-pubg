import { Match } from './interface';

const emptyParticipantStats = {
  DBNOs: 0,
  assists: 0,
  boosts: 0,
  damageDealt: 0,
  deathType: '',
  headshotKills: 0,
  heals: 0,
  killPlace: 0,
  killPoints: 0,
  killPointsDelta: 0,
  killStreaks: 0,
  kills: 0,
  lastKillPoints: 0,
  lastWinPoints: 0,
  longestKill: 0,
  mostDamage: 0,
  rankPoints: 0,
  revives: 0,
  rideDistance: 0,
  roadKills: 0,
  swimDistance: 0,
  teamKills: 0,
  timeSurvived: 0,
  vehicleDestroys: 0,
  walkDistance: 0,
  weaponsAcquired: 0,
  winPlace: 0,
  winPoints: 0,
  winPointsDelta: 0
};

const emptyMatch: Match = {
  platform: '',
  matchId: '',
  playerName: '',
  trophyNames: [],
  playerStats: emptyParticipantStats,
  avgStats: emptyParticipantStats,
  maxStats: emptyParticipantStats,
  minStats: emptyParticipantStats,
  createdAt: '',
  duration: 0,
  mapName: 'Desert_Main',
  participantCount: 0
};

export default emptyMatch;
