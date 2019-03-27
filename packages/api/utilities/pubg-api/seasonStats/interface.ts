export default interface SeasonStats {
  data: {
    type: 'playerSeason';
    attributes: {
      gameModeStats: {
        duo: GameModeStats;
        'duo-fpp': GameModeStats;
        solo: GameModeStats;
        'solo-fpp': GameModeStats;
        squad: GameModeStats;
        'squad-fpp': GameModeStats;
      };
    };
    relationships: {
      player: {
        data: {
          type: 'player';
          id: string;
        };
      };
      season: {
        data: {
          type: 'season';
          id: string;
        };
      };
      matchesSolo: MatchList;
      matchesSoloFPP: MatchList;
      matchesDuo: MatchList;
      matchesDuoFPP: MatchList;
      matchesSquad: MatchList;
      matchesSquadFPP: MatchList;
    };
  }[];
  links: {
    self: string;
  };
  meta: {};
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

interface MatchList {
  data: {
    type: 'match';
    id: string;
  };
}
