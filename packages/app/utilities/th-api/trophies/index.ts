import getTHApi from '../getTHApi';
import { Trophy } from './interface';

const getTrophies = () => {
  return getTHApi<Trophy[]>('trophies');
};

export default getTrophies;
export * from './interface';
