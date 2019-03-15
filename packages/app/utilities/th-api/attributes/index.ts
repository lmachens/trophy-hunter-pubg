import getTHApi from '../getTHApi';
import { Attributes } from './interface';

const getAttributes = () => {
  return getTHApi<Attributes>('attributes');
};

export default getAttributes;
export * from './interface';
