import healer from './healer';
import runner from './runner';
import swimmer from './swimmer';
import addicted from './addicted';
import straightShots from './straightShots';
import roadKills from './roadKills';
import sniper from './sniper';
import zombie from './zombie';
import collector from './collector';
import champions from './champions';

const trophies = {
  [addicted.name]: addicted,
  [champions.name]: champions,
  [collector.name]: collector,
  [healer.name]: healer,
  [roadKills.name]: roadKills,
  [runner.name]: runner,
  [sniper.name]: sniper,
  [straightShots.name]: straightShots,
  [swimmer.name]: swimmer,
  [zombie.name]: zombie
};

export default trophies;
