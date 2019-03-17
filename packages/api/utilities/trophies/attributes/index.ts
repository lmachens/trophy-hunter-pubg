export interface Attributes {
  [attributeName: string]: {
    key: string;
    subtitle: string;
    title: string;
  };
}

const attributes: Attributes = {
  DBNOs: {
    key: 'DBNOs',
    subtitle: 'Number of enemy players knocked',
    title: 'Knocked'
  },
  assists: {
    key: 'assists',
    subtitle: 'Number of enemy players this player damaged that were killed by teammates',
    title: 'Assists'
  },
  boosts: {
    key: 'boosts',
    subtitle: 'Number of boost items used',
    title: 'Boosters'
  },
  damageDealt: {
    key: 'damageDealt',
    subtitle: 'Total damage dealt. Note: Self inflicted damage is subtracted',
    title: 'Damage'
  },
  deathType: {
    key: 'deathType',
    subtitle: "The way by which this player died, or alive if they didn't",
    title: 'Death Type'
  },
  headshotKills: {
    key: 'headshotKills',
    subtitle: 'Number of enemy players killed with headshots',
    title: 'Headshots'
  },
  heals: {
    key: 'heals',
    subtitle: 'Number of healing items used',
    title: 'Healed'
  },
  killPlace: {
    key: 'killPlace',
    subtitle: "This player's rank in the match based on kills",
    title: 'Kill Place'
  },
  killStreaks: {
    key: 'killStreaks',
    subtitle: 'Total number of kill streaks',
    title: 'Kill Streaks'
  },
  kills: {
    key: 'kills',
    subtitle: 'Number of enemy players killed',
    title: 'Kills'
  },
  longestKill: {
    key: 'longestKill',
    subtitle: 'Distance of players longest kill',
    title: 'Longest Kill'
  },
  revives: {
    key: 'revives',
    subtitle: 'Number of times this player revived teammates',
    title: 'Revives'
  },
  rideDistance: {
    key: 'rideDistance',
    subtitle: 'Total distance traveled in vehicles measured in meters',
    title: 'Ride Distance'
  },
  roadKills: {
    key: 'roadKills',
    subtitle: 'Number of kills while in a vehicle',
    title: 'Road Kills'
  },
  swimDistance: {
    key: 'swimDistance',
    subtitle: 'Total distance traveled while swimming measured in meters',
    title: 'Swim Distance'
  },
  teamKills: {
    key: 'teamKills',
    subtitle: 'Number of times this player killed a teammate',
    title: 'Team Kills'
  },
  timeSurvived: {
    key: 'timeSurvived',
    subtitle: 'Amount of time survived measured in seconds',
    title: 'Time Survided'
  },
  vehicleDestroys: {
    key: 'vehicleDestroys',
    subtitle: 'Number of vehicles destroyed',
    title: 'Vehicles Destroyed'
  },
  walkDistance: {
    key: 'walkDistance',
    subtitle: 'Total distance traveled on foot measured in meters',
    title: 'Walk Distance'
  },
  weaponsAcquired: {
    key: 'weaponsAcquired',
    subtitle: 'Number of weapons picked up',
    title: 'Weapons Acquired'
  },
  winPlace: {
    key: 'winPlace',
    subtitle: "This player's placement in the match",
    title: 'Win Place'
  }
};

export default attributes;
