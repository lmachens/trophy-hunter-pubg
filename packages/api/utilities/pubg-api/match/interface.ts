export default interface Match {
  data: {
    type: 'match';
    id: string;
    attributes: {
      createdAt: string;
      gameMode: string;
      shardId: string;
      isCustomMatch: boolean;
      seasonState: string;
      duration: number;
      stats: null;
      titleId: string;
      tags: null;
      mapName: string;
    };
    relationships: {
      assets?: {
        data: {
          type: 'asset';
          id: string;
        }[];
      };
      rosters: {
        data: {
          type: 'roster';
          id: string;
        }[];
      };
      rounds: null;
      spectators: null;
    };
    links: {
      schema: '';
      self: string;
    };
  };
  included: (Participant | Roster | Asset)[];
  links: {
    self: string;
  };
  meta: {};
}

export interface Participant {
  type: 'participant';
  id: string;
  attributes: {
    stats: ParticipantStats;
    actor: string;
    shardId: string;
  };
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

export interface Roster {
  type: 'roster';
  id: string;
  attributes: {
    stats: {
      rank: number;
      teamId: number;
    };
    won: string;
    shardId: string;
  };
  relationships: {
    team: {
      data: null;
    };
    participants: {
      data: {
        type: 'participant';
        id: string;
      }[];
    };
  };
}

export interface Asset {
  type: 'asset';
  id: string;
  attributes: {
    name: string;
    description: string;
    createdAt: string;
    URL: string;
  };
}
