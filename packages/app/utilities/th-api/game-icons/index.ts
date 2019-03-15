import getTHApi from '../getTHApi';
import { SVGPath } from './interface';

interface GetGameIconsSvgPathProps {
  url: string;
}

const getGameIconsSvgPath = ({ url }: GetGameIconsSvgPathProps) => {
  return getTHApi<SVGPath>(`game-icons?url=${encodeURI(url)}`);
};

export default getGameIconsSvgPath;
export * from './interface';
