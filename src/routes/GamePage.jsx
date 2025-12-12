import styles from './GamePage.module.css';
import { usePlayer } from '../contexts/PlayerContext';
import { useComputer } from '../contexts/ComputerContext';
import Board from '../components/Board';
import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Player, makeAttack } from '../scripts/ship';
import Message from '../components/Message';

export default function GamePage() {

  const {player, setPlayer} = usePlayer();
  const {computer, setComputer} = useComputer();
  const navigate = useNavigate();

  const [msglog, setMsglog] = useState([(<p>Hostilities commenced!</p>), (<p>Open fire!</p>)]);

  const playerShipsLeft = useMemo(() => {
    return Object.keys(player.ships).length;
  }, [player]);
  const computerShipsLeft = useMemo(() => {
    return Object.keys(computer.ships).length;
  }, [computer]);

  const msglogEndRef = useRef(null);
  const moveQueue = useRef([]);

  const scrollToBottom = () => {
    msglogEndRef.current?.scrollIntoView({behaviour: 'smooth'});
  }

  const handleNavigateToRoot = () => {
    const destinationPath = '/';

    if (!document.startViewTransition) {
      //Fallback for older browsers
      navigate(destinationPath);
      return;
    }

    document.startViewTransition(() => {
      navigate(destinationPath);
    });
  };

  function generateCandidates(x, y) {
    let potentials = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]];
    let candidates = [];
    potentials.forEach(xy => {
      if (
        x >= 0 && x < player.size &&
        y >= 0 && y < player.size &&
        (!player.shots.has(JSON.stringify(xy)))
      ) {
        candidates.push(xy);
      }
    });
    return candidates;
  }

  useEffect(() => {
    if (playerShipsLeft === 0) {
      alert("You've lost! Click 'Restart Game' to try again!");
    } else if (computerShipsLeft === 0) {
      alert("You've won! Click 'Restart Game' to play again!")
    }
  }, [playerShipsLeft, computerShipsLeft])

  useEffect(() => {
    scrollToBottom();
  }, [msglog])

  function makeComputerAttack() {
    let newShot;
    if (moveQueue.current.length > 0) {
      newShot = moveQueue.current.shift();
    } else {
      let validShot = false;
      while (!validShot) {
        let rowI = Math.floor(Math.random() * player.size);
        let colI = Math.floor(Math.random() * player.size);
        newShot = [rowI, colI];
        if (!player.shots.has(JSON.stringify(newShot))) {
          validShot = true;
        }
      }
    }
    console.log(newShot);
    let newPlayer = structuredClone(player);
    let newShotToSet = JSON.stringify(newShot);
    newPlayer.shots.add(newShotToSet);
    let x = newShot[0];
    let y = newShot[1];
    const whatWasHit = makeAttack(x, y, newPlayer);
    newPlayer.board[x][y].hit = true;
    let newMsg = 'Computer ';
    if (whatWasHit) {
      let candidates = generateCandidates(x, y);
      moveQueue.current = [...moveQueue.current, ...candidates];
      let hitShip = newPlayer.ships[whatWasHit];
      hitShip.hits += 1;
      if (hitShip.hits >= hitShip.length) {
        hitShip.sunk = true;
        newMsg += 'sunk a ' + whatWasHit + '!';
        delete newPlayer.ships[whatWasHit];
        // empty queue now it's done its job
        moveQueue.current = [];
      } else {
        newMsg += 'hit a ' + whatWasHit + '!';
      }
    } else {
      newMsg += 'missed...';
    }
    setMsglog(prev => [...prev, (
      <p>{newMsg}</p>
    )]);
    setPlayer(newPlayer);
  }

  function handlePlayerAttack(event, rowI, colI) {
    let newCell = JSON.stringify([rowI, colI])
    if (computer.shots.has(newCell)) {
      alert('No use shooting the same cell twice!')
      return;
    }
    computer.shots.add(newCell);
    const whatWasHit = makeAttack(rowI, colI, computer);
    let newComputer = structuredClone(computer);
    newComputer.board[rowI][colI].hit = true;
    let newMsg = 'You ';
    if (whatWasHit) {
      let hitShip = newComputer.ships[whatWasHit];
      hitShip.hits += 1;
      if (hitShip.hits >= hitShip.length) {
        hitShip.sunk = true;
        newMsg += 'sunk a ' + whatWasHit + '!';
        delete newComputer.ships[whatWasHit]
      } else {
        newMsg += 'hit a ' + whatWasHit + '!';
      }
    } else {
      newMsg += 'missed...';
    }
    setMsglog(prev => [...prev, (
      <p>{newMsg}</p>
    )]);
    setComputer(newComputer);
    makeComputerAttack();
  }

  function handleRestartGame() {
    setPlayer(new Player('human'));
    setComputer(new Player('computer'));
    handleNavigateToRoot();
  }

  if (!player || !computer) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <main className = {styles.main}>
      <header className={styles.header}>
      </header>
      <article className={styles.article}>
        <p>Click in enemy waters to fire salvos!</p>
        <p>Find and destroy the enemy ships before you lose your own!</p>
        <div className={styles.msglog}>
          
          {msglog.map((msg, index) => (
            <Message
              key={index}
            >
              {msg}
            </Message>
          ))}
          <div ref={msglogEndRef} />
        </div>
        <div className={styles.boardbox}>
          <div className={styles.boardAndTitle}>
            <h2>Enemy Waters - 
              <span className={styles.shipNumber}>
                {computerShipsLeft}
              </span>
               ships
            </h2>
            <div className={styles.computerboard}>
              <Board
                onClick={handlePlayerAttack}
                type='computer'
              />
            </div>
          </div>
          <div className={styles.boardAndTitle}>
            <h2>Friendly Waters - 
              <span className={styles.shipNumber}>
                {playerShipsLeft}
              </span>
                ships
            </h2>
            <div className={styles.playerboard}>
              <Board
                onClick=''
                type='human'
              />
            </div>
          </div>
        </div>
        <div className = {styles.buttonbox}>
          <button
            type='button'
            className={styles.resetButton}
            id='resetButton'
            onClick={handleRestartGame}
          >
            Restart Game
          </button>
        </div>
      </article>
      <footer className={styles.footer}>
        <p className='credits'>Battleships exercise for the Odin Project, redone in React. Background from <a href="heropatterns.com" className={styles.link}>heropatterns.com.</a> Otherwise &copy; Micheal McErlean 2025.</p>
      </footer>
    </main>
  )
}