import { createContext, useContext, useState} from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router';
import './index.css'
import App from './App.jsx'
import {Ship, GameBoard, Player } from './scripts/ship.js';
import GamePage from './routes/GamePage.jsx'

const PlayerContext = createContext(null);
const ComputerContext = createContext(null);

function PlayerProvider({children}) {
  const [player, setPlayer] = useState(new Player('human'));
  return (
    <PlayerContext.Provider value={{player, setPlayer}}>
      {children}
    </PlayerContext.Provider>
  );
}

function ComputerProvider({children}) {
  const [computer, setComputer] = useState(new Player('computer'));
  return (
    <ComputerContext.Provider value = {{computer, setComputer}}>
      {children}
    </ComputerContext.Provider>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/game",
    element: <GamePage />
  }
])

createRoot(document.getElementById('root')).render(
  <PlayerProvider>
    <ComputerProvider>
      <RouterProvider router={router} />
    </ComputerProvider>
  </PlayerProvider>
)
