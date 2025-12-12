import styles from './GamePage.module.css';
import { usePlayer } from '../contexts/PlayerContext';
import { useComputer } from '../contexts/ComputerContext';
import Board from '../components/Board';
import { useState } from 'react';

export default function GamePage() {

  const {player, setPlayer} = usePlayer();
  const {computer, setComputer} = useComputer();

  const [msglog, setMsglog] = useState([(<p>Hostilities commenced!</p>), (<p>Open fire!</p>)]);

  function handlePlayerAttack(event) {
    return;
  }

  return (
    <main className = {styles.main}>
      <header className={styles.header}>
        <div className={styles.msglog}>
          {msglog}
        </div>
      </header>
      <article className={styles.article}>
        <div className={styles.boardbox}>
          <div className={styles.boardAndTitle}>
            <h2>Enemy Waters</h2>
            <div className={styles.computerboard}>
              <Board
                onClick={handlePlayerAttack}
                type='computer'
              />
            </div>
          </div>
          <div className={styles.boardAndTitle}>
            <h2>Friendly Waters</h2>
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