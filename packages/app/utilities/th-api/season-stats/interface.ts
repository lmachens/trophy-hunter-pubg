export interface SeasonStats {
  trophies: {
    [trophyName: string]: number;
  };
  matchesCount: number;
  gameModeStats: {
    duo: GameModeStats;
    'duo-fpp': GameModeStats;
    solo: GameModeStats;
    'solo-fpp': GameModeStats;
    squad: GameModeStats;
    'squad-fpp': GameModeStats;
  };
  matchesSolo: string[];
  matchesSoloFPP: string[];
  matchesDuo: string[];
  matchesDuoFPP: string[];
  matchesSquad: string[];
  matchesSquadFPP: string[];
}

interface GameModeStats {
  assists: number;
  bestRankPoint: number;
  boosts: number;
  dBNOs: number;
  dailyKills: number;
  dailyWins: number;
  damageDealt: number;
  days: number;
  headshotKills: number;
  heals: number;
  killPoints: number;
  kills: number;
  longestKill: number;
  longestTimeSurvived: number;
  losses: number;
  maxKillStreaks: number;
  mostSurvivalTime: number;
  rankPoints: number;
  rankPointsTitle: string;
  revives: number;
  rideDistance: number;
  roadKills: number;
  roundMostKills: number;
  roundsPlayed: number;
  suicides: number;
  swimDistance: number;
  teamKills: number;
  timeSurvived: number;
  top10s: number;
  vehicleDestroys: number;
  walkDistance: number;
  weaponsAcquired: number;
  weeklyKills: number;
  weeklyWins: number;
  winPoints: number;
  wins: number;
}
