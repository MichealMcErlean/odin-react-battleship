export class Ship {
  constructor(length = 2, hits = 0, sunk = false, loc = [], name = '') {
    this.length = length;
    this.hits = hits;
    this.sunk = false;
    this.loc = loc;
    this.name = name;
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    if (this.hits >= this.length) {
      this.sunk = true;
      return true;
    }
    return false;
  }
}

export class GameBoard {
  constructor(size = 10) {
    this.size = size;
    this.board = this.#buildBoard(this.size);
    this.ships = [];
    this.shots = new Set();
  }

  #buildBoard(size) {
    let board = new Array(size);
    board.fill(new Array(size).fill(0));
    return board;
  }

  placeShip(ship, coords) {
    ship.loc = coords;
    let valid = true;
    this.ships.forEach(realShip => {
      realShip.loc.forEach(coord => {
        ship.loc.forEach(xy => {
          if (this.#matchCoords(coord, xy)) {
            valid = false;
          }
        })
      })
    })
    if (valid) {
      this.ships.push(ship);
      return true;
    } else {
      return false;
    }    
  }

  #matchCoords(a, b) {
    return (a[0] == b[0] && a[1] == b[1])
  }

  validShot(xy) {
    return this.shots.has(JSON.stringify(xy)) ? false : true;
  }

  receiveAttack(xy) {
    let x = xy[0];
    let y = xy[1];
    let hitShip = null;
    this.ships.forEach(ship => {
      ship.loc.forEach(ab => {
        if (this.#matchCoords(xy, ab)) {
          ship.hit();
          hitShip = ship;
          this.board[x][y] = 2;
          if (ship.isSunk()) {
            this.ships = this.ships.filter(ship => ship.isSunk() == false);
          }
        }
      })
    })
    this.board[x][y] = 1;
    this.shots.add(JSON.stringify(xy));
    if (hitShip !== null) {
      return hitShip;
    }
    return false;
  }

  shipsLeft() {
    return this.ships.length > 0;
  }

  generateRandomShipPlace(ship) {
    let randomPlace = [];
    let whichWay = Math.floor(Math.random() * 2);
    if (whichWay == 0) {
      let firstX = Math.floor(Math.random() * (this.size + 1 - ship.length));
      let firstY = Math.floor(Math.random() * this.size);
      randomPlace.push([firstX, firstY]);
      for (let i = firstX + 1; i < firstX + ship.length; i++) {
        randomPlace.push([i, firstY]);
      }
    } else if (whichWay == 1) {
      let firstX = Math.floor(Math.random() * this.size);
      let firstY = Math.floor(Math.random() * (this.size + 1 - ship.length));
      randomPlace.push([firstX, firstY]);
      for (let i = firstY + 1; i < firstY + ship.length; i++) {
        randomPlace.push([firstX, i]);
      }
    }
    return randomPlace;
  }
}

export class Player {
  constructor(type) {
    this.board = new GameBoard();
    this.type = type == 'human' ? type : 'computer';
  }
}