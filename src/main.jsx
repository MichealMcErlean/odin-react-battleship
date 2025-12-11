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
import { PlayerProvider } from './contexts/PlayerContext.jsx';
import { ComputerProvider } from './contexts/ComputerContext.jsx';



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
