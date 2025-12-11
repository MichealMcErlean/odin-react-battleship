
import Cell from './Cell.jsx';
import styles from './Board.module.css'
import { usePlayer } from '../contexts/PlayerContext.jsx';
import { useComputer } from '../contexts/ComputerContext.jsx';

export default function Board({onClick, type}) {
  let player;
  let setPlayer;

  if (type == 'human') {
    ({player, setPlayer} = usePlayer());
  } else {
    ({player, setPlayer} = useComputer());
  }

  return (
    <div className={styles.container}>
      {player.board.map((row, rowI) => (
        row.map((cell, colI) => (
          <Cell 
            isHit={player.board[rowI][colI].hit}
            contains={player.board[rowI][colI].ship}
            type={type}
            onClick={(e) => onClick(e, rowI, colI)}
            key={`${rowI}-${colI}`}
          />
         ))
      ))}
    </div>
  )
}