export interface Attributes {
  [attributeName: string]: {
    key: string;
    title: string;
    unit: string;
  };
}

const attributes: Attributes = {
  'participantStats.boosts': {
    key: 'participantStats.boosts',
    title: 'Number of boost items used',
    unit: 'boosters'
  },
  'participantStats.heals': {
    key: 'participantStats.heals',
    title: 'Number of healing items used',
    unit: 'healed'
  },
  'participantStats.walkDistance': {
    key: 'participantStats.walkDistance',
    title: 'Total distance traveled on foot measured in meters',
    unit: 'm walked'
  },
  'participantStats.headshotKills': {
    key: 'participantStats.headshotKills',
    title: 'Number of enemy players killed with headshots',
    unit: 'headshots'
  },
  'participantStats.swimDistance': {
    key: 'participantStats.swimDistance',
    title: 'Total distance traveled while swimming measured in meters',
    unit: 'm swam'
  },
  'generalStats.mostHeadshotKills': {
    key: 'generalStats.mostHeadshotKills',
    title: 'Maximum number of enemy players killed with headshots',
    unit: 'most headshots'
  }
};

export default attributes;
