import { useState } from 'react'
import './App.css'

function App() {
  const [carrierPlaced, setCarrierPlaced] = useState(false);
  const [battleshipPlaced, setBattleshipPlaced] = useState(false);
  const [cruiserPlaced, setCruiserPlaced] = useState(false);
  const [submarinePlaced, setSubmarinePlaced] = useState(false);
  const [destroyerPlaced, setDestroyerPlaced] = useState(false);

  function allShipsPlaced() {
    return (
      carrierPlaced == true &&
      battleshipPlaced == true &&
      cruiserPlaced == true &&
      submarinePlaced == true &&
      destroyerPlaced == true
    );
  }

  return (
    <main>
      <header>
        <h1>BATTLESHIPS</h1>
        {allShipsPlaced() ? (
          <h2> Ready to go!</h2>
        ) : (
          <h2>Place your ships!</h2>
        )}
      </header>
      <article className='article'>
        <div className="playerboard">placeholder</div>
        <div className="buttonbox">
          <div className="shipbuttons">
            <button type="button"> 
              <p>Carrier</p>
              <p className="lengthnum">5</p>
            </button>
            <button type="button">
              <p>Battleship</p>
              <p className="lengthnum">4</p>
            </button>
            <button type="button">
              <p>Cruiser</p>
              <p className="lengthnum">3</p>
            </button>
            <button type="button">
              <p>Sub</p>
              <p className="lengthnum">3</p>
            </button>
            <button type="button">
              <p>Destroyer</p>
              <p className="lengthnum">2</p>
            </button>
          </div>
          <div className="utilbuttons">
            <button type="button">Random Positions</button>
            <button type="button">Rotate</button>
            <button type="button">Reset</button>
            <button type="button">Start Game</button>
          </div>
        </div>
      </article>
      <footer>
        <p className='credits'>Battleships exercise for the Odin Project, redone in React. &copy; Micheal McErlean 2025.</p>
      </footer>
    </main>
  )
}

export default App
