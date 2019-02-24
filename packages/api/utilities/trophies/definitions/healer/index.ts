import Trophy from '../interface';

const healer: Trophy = {
  name: 'healer',
  title: 'Healer',
  description: 'Heal at least one teammate',
  check: ({ participantStats }) => {
    return participantStats.heals >= 1;
  }
};

export default healer;
