import healer from './healer';
import runner from './runner';
import swimmer from './swimmer';
import addicted from './addicted';
import straightShots from './straightShots';
import roadKills from './roadKills';

const trophies = {
  [addicted.name]: addicted,
  [healer.name]: healer,
  [roadKills.name]: roadKills,
  [runner.name]: runner,
  [straightShots.name]: straightShots,
  [swimmer.name]: swimmer
};

export default trophies;
