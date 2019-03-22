import { useContext } from 'react';
import PlayerContext from './PlayerContext';

const usePlayer = () => {
  return useContext(PlayerContext);
};

export default usePlayer;
