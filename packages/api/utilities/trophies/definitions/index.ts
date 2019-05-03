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
import panzerfaust from './panzerfaust';
import assistent from './assistent';
import fat from './fat';
import serialKiller from './serialKiller';
import omnipresent from './omnipresent';
import achillesHeel from './achillesHeel';
import muscleUp from './champions';

const trophies = {
  [achillesHeel.name]: achillesHeel,
  [addicted.name]: addicted,
  [assistent.name]: assistent,
  [champions.name]: champions,
  [collector.name]: collector,
  [fat.name]: fat,
  [healer.name]: healer,
  [muscleUp.name]: muscleUp,
  [omnipresent.name]: omnipresent,
  [panzerfaust.name]: panzerfaust,
  [roadKills.name]: roadKills,
  [runner.name]: runner,
  [serialKiller.name]: serialKiller,
  [sniper.name]: sniper,
  [straightShots.name]: straightShots,
  [swimmer.name]: swimmer,
  [zombie.name]: zombie
};

export default trophies;
