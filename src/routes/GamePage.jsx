import styles from './GamePage.module.css';

export default function GamePage() {

  return (
    <main>
      <header className={styles.header}>
        <div className={styles.msglog}>
          <p>Hostilities commenced!</p>
          <p>Open fire!</p>
        </div>
      </header>
      <article className={styles.article}>
        <div className={styles.boardbox}>
          <div className={styles.computerboard}>
            Placeholder
          </div>
          <div className={styles.playerboard}>
            Placeholder
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