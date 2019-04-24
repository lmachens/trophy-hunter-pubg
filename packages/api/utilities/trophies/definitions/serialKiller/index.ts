import Trophy from '../interface';
import attributes from '../../attributes';

const serialKiller: Trophy = {
  name: 'serialKiller',
  title: 'Serial Killer',
  author: 'lmachens',
  description: 'Kill five players and have most killing streaks',
  attributes: [attributes.kills.key, attributes.killStreaks.key],
  src: 'https://game-icons.net/1x1/delapouite/jason-mask.html',
  svgPath:
    'M215 28.084c-41.58 6.557-73.571 23.214-96.637 46.28C89.316 103.41 74.133 142.997 73.066 187H105v82H80.191c7.48 41.377 20.766 83.17 39.75 118.766C151.043 446.08 196.125 487 256 487s104.957-40.92 136.059-99.234c18.984-35.596 32.27-77.389 39.75-118.766H407v-82h31.934c-1.067-44.002-16.25-83.59-45.297-112.637C370.57 51.298 338.58 34.641 297 28.084V73h-82V28.084zM191 64a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm130 0a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zM187 96a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm138 0a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm-142 39a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm48 0a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm50 0a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm48 0a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm-137 29h128l-64 28-64-28zm-16 19c25.983 0 49 17.247 49 41s-23.017 41-49 41-49-17.247-49-41 23.017-41 49-41zm160 0c25.983 0 49 17.247 49 41s-23.017 41-49 41-49-17.247-49-41 23.017-41 49-41zM208 304l-48 48h-20l68-48zm16 0h64s-16.915 32-32 32-32-32-32-32zm80 0l68 48h-20l-48-48zm-80 64a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm64 0a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm-96 16a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm128 0a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm-96 16a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm64 0a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm-119 7a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm174 0a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm-119 25a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm64 0a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9z',
  check: ({ playerStats, maxStats }) => {
    return playerStats.kills >= 5 && playerStats.killStreaks === maxStats.killStreaks;
  }
};

export default serialKiller;
