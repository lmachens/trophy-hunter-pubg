import { useContext } from 'react';
import PlayerContext from './PlayerContext';

const usePlayer = () => {
  return useContext(PlayerContext).player;
};

export default usePlayer;
