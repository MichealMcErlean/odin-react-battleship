
import Cell from './Cell.jsx';
import styles from './Board.module.css'
import { usePlayer } from '../contexts/PlayerContext.jsx';
import { useComputer } from '../contexts/ComputerContext.jsx';

export default function Board({onClick, type}) {

  let currentPlayer;
  let setCurrentPlayer;

  if (type === 'human') {
    ({player: currentPlayer, setPlayer: setCurrentPlayer} = usePlayer());
  } else {
    ({computer: currentPlayer, setComputer: setCurrentPlayer} = useComputer());
  }

  if (!currentPlayer || !currentPlayer.board) {
    return <div>Loading board...</div>
  }

  return (
    <div className={styles.container}>
      {currentPlayer.board.map((row, rowI) => (
        row.map((cell, colI) => (
          <Cell 
            isHit={currentPlayer.board[rowI][colI].hit}
            contains={currentPlayer.board[rowI][colI].ship}
            type={type}
            onClick={(e) => onClick(e, rowI, colI)}
            key={`${rowI}-${colI}`}
          />
         ))
      ))}
    </div>
  )
}