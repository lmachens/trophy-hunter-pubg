export interface Attributes {
  [attributeName: string]: {
    key: string;
    title: string;
    unit: string;
  };
}

const attributes: Attributes = {
  DBNOs: {
    key: 'DBNOs',
    title: 'Number of enemy players knocked',
    unit: 'knocked'
  },
  assists: {
    key: 'assists',
    title: 'Number of enemy players this player damaged that were killed by teammates',
    unit: 'assists'
  },
  boosts: {
    key: 'boosts',
    title: 'Number of boost items used',
    unit: 'boosters'
  },
  damageDealt: {
    key: 'damageDealt',
    title: 'Total damage dealt. Note: Self inflicted damage is subtracted',
    unit: 'damage'
  },
  deathType: {
    key: 'deathType',
    title: "The way by which this player died, or alive if they didn't",
    unit: ''
  },
  headshotKills: {
    key: 'headshotKills',
    title: 'Number of enemy players killed with headshots',
    unit: 'headshots'
  },
  heals: {
    key: 'heals',
    title: 'Number of healing items used',
    unit: 'healed'
  },
  killPlace: {
    key: 'killPlace',
    title: "This player's rank in the match based on kills",
    unit: 'kill place'
  },
  killStreaks: {
    key: 'killStreaks',
    title: 'Total number of kill streaks',
    unit: 'kill streaks'
  },
  kills: {
    key: 'kills',
    title: 'Number of enemy players killed',
    unit: 'kills'
  },
  longestKill: {
    key: 'longestKill',
    title: 'Distance of players longest kill',
    unit: 'longest kill'
  },
  revives: {
    key: 'revives',
    title: 'Number of times this player revived teammates',
    unit: 'revives'
  },
  rideDistance: {
    key: 'rideDistance',
    title: 'Total distance traveled in vehicles measured in meters',
    unit: 'ride distance'
  },
  roadKills: {
    key: 'roadKills',
    title: 'Number of kills while in a vehicle',
    unit: 'road kills'
  },
  swimDistance: {
    key: 'swimDistance',
    title: 'Total distance traveled while swimming measured in meters',
    unit: 'm swam'
  },
  teamKills: {
    key: 'teamKills',
    title: 'Number of times this player killed a teammate',
    unit: 'team kills'
  },
  timeSurvived: {
    key: 'timeSurvived',
    title: 'Amount of time survived measured in seconds',
    unit: 'seconds survided'
  },
  vehicleDestroys: {
    key: 'vehicleDestroys',
    title: 'Number of vehicles destroyed',
    unit: 'vehicles destroyed'
  },
  walkDistance: {
    key: 'walkDistance',
    title: 'Total distance traveled on foot measured in meters',
    unit: 'm walked'
  },
  weaponsAcquired: {
    key: 'weaponsAcquired',
    title: 'Number of weapons picked up',
    unit: 'weapons picked up'
  },
  winPlace: {
    key: 'winPlace',
    title: "This player's placement in the match",
    unit: 'win place'
  }
};

export default attributes;
