import {createContext, useContext, useState} from 'react';
import { Player } from '../scripts/ship';

const initialComputerState = new Player('computer');
export const ComputerContext = createContext(initialComputerState);

export const useComputer = () => {
  const context = useContext(ComputerContext);
  if (context === undefined) {
    throw new Error('useComputer must be used within a ComputerProvider');
  }
  return context;
}

export const ComputerProvider = ({children}) => {
  const [computer, setComputer] = useState(initialComputerState);
  console.log(computer);
  
  return (
    <ComputerContext.Provider value={{computer, setComputer}}>
      {children}
    </ComputerContext.Provider>
  );
}