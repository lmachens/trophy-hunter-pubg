import getTHApi from '../getTHApi';
import { Season } from './interface';

interface GetSeasonsProps {
  platform: string;
}

const getSeasons = ({ platform }: GetSeasonsProps) => {
  return getTHApi<Season[]>(`seasons?platform=${platform}`);
};

export default getSeasons;
export * from './interface';
