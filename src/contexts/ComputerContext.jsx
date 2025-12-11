import {createContext, useContext, useState} from 'react';
import { Player } from '../scripts/ship';

export const ComputerContext = createContext(undefined);

export const useComputer = () => {
  const context = useContext(ComputerContext);
  if (context === undefined) {
    throw new Error('useComputer must be used within a ComputerProvider');
  }
  return context;
}

export const ComputerProvider = ({children}) => {
  const [computer, setComputer] = useState(new Player('computer'));
  const contextValue = {
    computer,
    setComputer
  };
  return (
    <ComputerContext.Provider value={contextValue}>
      {children}
    </ComputerContext.Provider>
  );
}