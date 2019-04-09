import { createContext } from 'react';
import { Match } from 'utilities/th-api/match';
import { Game } from './interface';

interface LiveContextProps {
  match?: Match;
  game?: Game;
}
const LiveContext = createContext<LiveContextProps>({});

export default LiveContext;
