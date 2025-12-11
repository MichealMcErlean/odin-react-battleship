import {createContext, useContext, useState} from 'react';
import { Player } from '../scripts/ship';

export const PlayerContext = createContext(undefined);

export const usePlayer= () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}

export const PlayerProvider = ({children}) => {
  const [player, setPlayer] = useState(new Player('human'));
  const contextValue = {
    player,
    setPlayer
  };
  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
}