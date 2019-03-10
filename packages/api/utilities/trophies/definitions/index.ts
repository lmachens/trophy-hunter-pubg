import healer from './healer';
import runner from './runner';
import swimmer from './swimmer';

const trophies = {
  [healer.name]: healer,
  [runner.name]: runner,
  [swimmer.name]: swimmer
};

export default trophies;
