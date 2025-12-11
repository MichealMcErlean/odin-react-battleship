import { useState, useEffect } from 'react'
import './App.css'
import FollowerShape from './components/FollowerShape';
import Board from './components/Board';
import { usePlayer } from './contexts/PlayerContext.jsx';
import { useComputer } from './contexts/ComputerContext.jsx';

function App() {
  const [carrierPlaced, setCarrierPlaced] = useState(false);
  const [battleshipPlaced, setBattleshipPlaced] = useState(false);
  const [cruiserPlaced, setCruiserPlaced] = useState(false);
  const [submarinePlaced, setSubmarinePlaced] = useState(false);
  const [destroyerPlaced, setDestroyerPlaced] = useState(false);
  const [placing, setPlacing] = useState(null);

  //Contexts
  const { player, setPlayer} = usePlayer();
  const { computer, setComputer} = useComputer;

  // States for floating follower
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
  const [isVisible, setIsVisible] = useState(false);
  const [shapeConfig, setShapeConfig] = useState({
    type: 'horizontal',
    size: 30,
    numberValue: 5,
  });

  function updateMousePosition(ev) {
    setMousePosition({x: ev.clientX, y: ev.clientY});
  }

  function toggleVisibility() {
    setIsVisible(!isVisible);
  }

  function toggleDirection() {
    setShapeConfig(prev => ({
      ...prev,
      type: prev.type == 'horizontal' ? 'vertical' : 'horizontal',
    }));
  }

  function changeValue(num) {
    setShapeConfig(prev => ({
      ...prev,
      numberValue: num,
    }));
  }

  function allShipsPlaced() {
    return (
      carrierPlaced == true &&
      battleshipPlaced == true &&
      cruiserPlaced == true &&
      submarinePlaced == true &&
      destroyerPlaced == true
    );
  }

  useEffect (() => {
    if (isVisible) {
      window.addEventListener('mousemove', updateMousePosition);
    }
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [isVisible]);

  function handleCarrierClick() {
    toggleVisibility();
    changeValue(5);
    setPlacing('carrier');
  }

  function handleBattleshipClick() {
    toggleVisibility();
    changeValue(4);
    setPlacing('battleship');
  }

  function handleCruiserClick() {
    toggleVisibility();
    changeValue(3);
    setPlacing('cruiser');
  }

  function handleSubmarineClick() {
    toggleVisibility();
    changeValue(3);
    setPlacing('submarine');
  }
  
  function handleDestroyerClick() {
    toggleVisibility();
    changeValue(2);
    setPlacing('destroyer');
  }

  function handlePlaceShip(event, rowI, colI) {
    return;
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
        <div className="playerboard">
          <Board 
            type='human'
            onClick={handlePlaceShip}
          />
        </div>
        <div className="buttonbox">
          <div className="shipbuttons">
            <button 
              type="button"
              onClick={handleCarrierClick}
            > 
              <p>Carrier</p>
              <p className="lengthnum">5</p>
            </button>
            <button 
              type="button"
              onClick={handleBattleshipClick}
            >
              <p>Battleship</p>
              <p className="lengthnum">4</p>
            </button>
            <button 
              type="button"
              onClick={handleCruiserClick}
            >
              <p>Cruiser</p>
              <p className="lengthnum">3</p>
            </button>
            <button 
              type="button"
              onClick={handleSubmarineClick}
            >
              <p>Sub</p>
              <p className="lengthnum">3</p>
            </button>
            <button 
              type="button"
              onClick={handleDestroyerClick}
            >
              <p>Destroyer</p>
              <p className="lengthnum">2</p>
            </button>
          </div>
          <div className="utilbuttons">
            <button type="button">Random Positions</button>
            <button 
              type="button"
              onClick={() => toggleDirection()}
            >
              Rotate
            </button>
            <button type="button">Reset</button>
            <button type="button">Start Game</button>
          </div>
        </div>
      </article>
      <footer>
        <p className='credits'>Battleships exercise for the Odin Project, redone in React. Background from <a href="heropatterns.com">heropatterns.com.</a> Otherwise &copy; Micheal McErlean 2025.</p>
      </footer>
      {isVisible && (
        <FollowerShape 
          mousePosition={mousePosition}
          config={shapeConfig}
        />
      )}
    </main>
  )
}

export default App
