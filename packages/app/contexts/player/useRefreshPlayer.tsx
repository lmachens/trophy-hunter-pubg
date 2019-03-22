import { useContext } from 'react';
import PlayerContext from './PlayerContext';

const useRefreshlayer = () => {
  return useContext(PlayerContext).refreshPlayer!;
};

export default useRefreshlayer;
