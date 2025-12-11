import styles from './Cell.module.css';
import {useState} from 'react';

export default function Cell({isHit, contains, type, onClick}) {

  const shipSymbol = {
    carrier: 'Ca',
    battleship: 'B',
    cruiser: 'Cr',
    submarine: 'S',
    destroyer: 'D',
  }

  let cell, text;

  if (contains == null) {
    if (isHit == true) {
      cell = styles.missedShot;
      text = '*'
    } else {
      cell = styles.openOcean;
      text = '~'
    }
  } else {
    if (isHit == true) {
      cell = styles.hitShip;
      text = shipSymbol[contains];
    } else {
      if (type == 'human') {
        cell = styles.friendlyShip;
        text = shipSymbol[contains];
      } else {
        cell = styles.openOcean;
        text = '~';
      }
    }
  }

  return (
    <div
      className={cell}
      onClick={onClick}
    >
      {text}
    </div>
  );

}