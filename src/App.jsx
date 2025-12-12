import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router';
import styles from './App.module.css'
import FollowerShape from './components/FollowerShape';
import Board from './components/Board';
import ShipButtons from './components/ShipButtons.jsx'
import { usePlayer } from './contexts/PlayerContext.jsx';
import { useComputer } from './contexts/ComputerContext.jsx';
import { 
  Player, 
  isLegalPlace,
  placeShipsAtRandom 
} from './scripts/ship.js';

function App() {
  const [placedShips, setPlacedShips] = useState([]);
  const [placing, setPlacing] = useState(null);
  const [availableShips, setAvailableShips] = useState({
    carrier: 5, 
    battleship: 4, 
    cruiser: 3, 
    submarine: 3, 
    destroyer: 2,
})

  const navigate = useNavigate();

  //Contexts
  const { player, setPlayer} = usePlayer();
  const { computer, setComputer} = useComputer();

  // States for floating follower
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
  const [isVisible, setIsVisible] = useState(false);
  const [shapeConfig, setShapeConfig] = useState({
    type: 'horizontal',
    size: 30,
    numberValue: 5,
  });

  const handleNavigationToGame = () => {
    const destinationPath='/game';

    if (!document.startViewTransition) {
      //fallback for non-compliant browsers
      navigate(destinationPath);
      return;
    }

    document.startViewTransition(() => {
      navigate(destinationPath);
    });
  }

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
      placedShips.length == 5
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

  function onShipSelect(shipType) {
    toggleVisibility();
    changeValue(availableShips[shipType]);
    setPlacing(shipType);
  }

  function handlePlaceShip(event, rowI, colI) {
    if (!isVisible) {
      alert('Pick a ship to place!');
      return;
    }
    let cells = isLegalPlace([rowI, colI], player, shapeConfig.numberValue, shapeConfig.type);
    console.log(cells);
    if (!cells) {
      alert('Illegal placement!');
      return;
    }
    let newPlayer = structuredClone(player);
    console.log(cells);
    console.log(placing);
    cells.forEach(cell => {
      newPlayer.board[cell[0]][cell[1]].ship = String(placing);
    })
    setPlayer(newPlayer);
    console.log(newPlayer);
    setPlacedShips(prev => [...prev, placing]);
    setPlacing(null);
    toggleVisibility();
  }

  function resetBoard() {
    if (isVisible) {
      toggleVisibility();
    }
    setPlacing(null);
    setPlacedShips([]);
    setPlayer(new Player('human'));
  }

  function handleRandomShips() {
    placeShipsAtRandom(availableShips, player, setPlayer);
    Object.keys(availableShips).forEach(ship => {
      placedShips.push(ship);
    })
  }

  function handleStartGame() {
    placeShipsAtRandom(availableShips, computer, setComputer);
    handleNavigationToGame();
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
      <article className={styles.article}>
        <div className={styles.playerboard}>
          <Board 
            type='human'
            onClick={handlePlaceShip}
          />
        </div>
        <div className={styles.buttonbox}>
          <div className={styles.shipbuttons}>
            <ShipButtons 
              availableShips={availableShips}
              placedShips={placedShips}
              onShipSelect={onShipSelect}
            />
          </div>
          <div className={styles.utilbuttons}>
            <button 
              type="button"
              onClick={handleRandomShips}
            >
              Random Positions
            </button>
            <button 
              type="button"
              onClick={() => toggleDirection()}
            >
              Rotate
            </button>
            <button type="button" onClick={resetBoard}>Reset</button>
            <button 
              type="button"
              disabled={allShipsPlaced() ? false : true}
              onClick={handleStartGame}
            >
              Start Game
            </button>
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
