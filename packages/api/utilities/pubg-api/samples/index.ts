import getPUBGApi from '../getPUBGApi';
import Samples from './interface';

interface GetSamplesProps {
  platform: string;
}

const getSamples = ({ platform }: GetSamplesProps) => {
  return getPUBGApi<Samples>({
    platform,
    endpoint: 'samples'
  });
};

export default getSamples;
