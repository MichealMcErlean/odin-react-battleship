import {Ship, GameBoard, Player} from './ship.js';


let carrier;
let battleship;
let cruiser;
let submarine;
let destroyer;
let playerBoard;
let player1;
let player2;

beforeAll(() => {
    carrier = new Ship(5);
    destroyer = new Ship();
    playerBoard = new GameBoard();
  })

describe('A Ship', () => {

  
  it('takes length as an argument', () => {
    

    expect(carrier.length).toEqual(5);
    expect(destroyer.length).toEqual(2);
  })

  it('takes an array of co-ordinates as argument', () => {
    cruiser = new Ship(5, 0, false, [[3,4],[3,5],[3,6],[3,7]]);
    expect(cruiser.loc[0][0]).toEqual(3);
    expect(cruiser.loc[0][1]).toEqual(4);
  })

  it('can be assigned a name, at creation or otherwise', () => {
    cruiser = new Ship(5, 0, false, [[3,4],[3,5],[3,6],[3,7]], 'Cruiser');
    destroyer.name = 'Destroyer';
    expect(cruiser.name).toEqual('Cruiser');
    expect(destroyer.name).toEqual('Destroyer');
  })

  it('takes damage via the hit() function', () => {
    carrier.hit();
    expect(carrier.hits).toEqual(1);
  })

  it(' is considered sunk when hits exceed its length', () => {
    destroyer.hit();
    destroyer.hit();
    expect(destroyer.isSunk()).toEqual(true);
  })
});

describe('A GameBoard', () => {

  it('creates a grid of the specified size, defaults to 10x10', () => {
    expect(playerBoard.board[0][0]).toEqual(0);
    expect(playerBoard.board[4][6]).toEqual(0);
    expect(playerBoard.board[9][9]).toEqual(0);
  })

  it('has a list of ships on the board', () => {
    playerBoard.ships.push(new Ship(2, 0, false, [[1,1],[1,2]]));
    expect(playerBoard.ships[0].length).toEqual(2);
  })

  it('can place a Ship at provided co-ordinates', () => {
    submarine = new Ship(3, 0, false, [], "Submarine");
    playerBoard.placeShip(submarine, [[4,6],[5,6],[6,6]]);
    expect(submarine.loc[0]).toEqual([4,6]);
  })

  it('can reject a Ship placement that overlaps',() => {
    battleship = new Ship(4, 0, false, [], "Battleship");
    expect(playerBoard.placeShip(battleship, [[4,6],[4,7],[4,8],[4,9]])).toEqual(false);
    
  });

  it('is testing another Ship placement', () => {
    expect(playerBoard.placeShip(battleship, [[1,2],[2,2],[3,2],[4,2]])).toEqual(false);
  })

  // it('should have 2 ships at the moment', () => {
  //   expect(playerBoard.ships.length).toEqual(2);
  // })

  // it('should have a ship at [1,1],[1,2]', () => {
  //   expect(playerBoard.ships[0].loc).toContainEqual([1,1]);
  // })

  it('can receiveAttack, accepting a pair of co-ordinates', () => {
    expect(playerBoard.receiveAttack([5,6])).toEqual(submarine);
  });

  it('checks if a Ship is hit, returning the ship if it is', () => {
    expect(playerBoard.receiveAttack([4,6])).toEqual(submarine);
  })

  it('returns false on a miss', () => {
    expect(playerBoard.receiveAttack([8,9])).toEqual(false);
  })

  it('can report whether all its ships are gone', () => {
    expect(playerBoard.shipsLeft()).toEqual(true);
  })  

  it('can randomly generate a viable set of co-ordinates to place a Ship', () => {
    let newDes = new Ship(2, 0, false, [], 'Destroyer');
    let newCru = new Ship(3, 0, false, [], 'Cruiser');
    let newBat = new Ship(4, 0, false, [], 'Battleship');
    let newCar = new Ship(5, 0, false, [], 'Carrier')
    let newLoc = playerBoard.generateRandomShipPlace(newDes);
    expect(newLoc).toEqual(expect.arrayOf(expect.arrayOf(expect.any(Number))));
    expect(newLoc).toHaveLength(2);
    newLoc = playerBoard.generateRandomShipPlace(newCru);
    expect(newLoc).toEqual(expect.arrayOf(expect.arrayOf(expect.any(Number))));
    expect(newLoc).toHaveLength(3);
    newLoc = playerBoard.generateRandomShipPlace(newBat);
    expect(newLoc).toEqual(expect.arrayOf(expect.arrayOf(expect.any(Number))));
    expect(newLoc).toHaveLength(4);
    newLoc = playerBoard.generateRandomShipPlace(newCar);
    expect(newLoc).toEqual(expect.arrayOf(expect.arrayOf(expect.any(Number))));
    expect(newLoc).toHaveLength(5);
      
    
  })

});

describe('A Player', () => {

  beforeAll(() => {
    player1 = new Player();
  })

  it('has a GameBoard', () => {
    expect(player1.board.board).toBeDefined();
  })

});