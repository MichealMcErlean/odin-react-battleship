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

  const scrollToBottom = () => {
    msglogEndRef.current?.scrollIntoView({behaviour: 'smooth'});
  }

  useEffect(() => {
    scrollToBottom();
  }, [msglog])

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
  }

  function handleRestartGame() {
    setPlayer(new Player('human'));
    setComputer(new Player('computer'));
    navigate('/');
  }

  if (!player || !computer) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <main className = {styles.main}>
      <header className={styles.header}>
        <p>Click in enemy waters to fire salvos!</p>
        <p>Find and destroy the enemy ships before you lose your own!</p>
      </header>
      <article className={styles.article}>
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