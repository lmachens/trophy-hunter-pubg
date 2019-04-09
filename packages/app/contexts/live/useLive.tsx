import { useContext } from 'react';
import LiveContext from './LiveContext';

const useLive = () => {
  return useContext(LiveContext);
};

export default useLive;
