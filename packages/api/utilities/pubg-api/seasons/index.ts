import getPUBGApi from '../getPUBGApi';
import Seasons from './interface';

interface GetSeasonsProps {
  platform: string;
}

const getSeasons = ({ platform }: GetSeasonsProps) => {
  return getPUBGApi<Seasons>({
    platform,
    endpoint: 'seasons'
  });
};

export default getSeasons;
