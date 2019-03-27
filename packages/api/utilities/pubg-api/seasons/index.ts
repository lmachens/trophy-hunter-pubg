import getPUBGApi from '../getPUBGApi';
import Seasons, { Season } from './interface';

interface GetSeasonsProps {
  platform: string;
}

const getSeasons = ({ platform }: GetSeasonsProps): Promise<Season[]> => {
  return getPUBGApi<Seasons>({
    platform,
    endpoint: 'seasons'
  }).then(seasons =>
    seasons.data.map(season => ({
      id: season.id,
      ...season.attributes
    }))
  );
};

export default getSeasons;
