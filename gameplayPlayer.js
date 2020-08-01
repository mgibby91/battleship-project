
let computerBoard = [
  [0, 'R', 'R', 'R', 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 'S'],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 'S'],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 'S'],
  [0, 0, 0, 'C', 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 'C', 0, 0, 0, 0, 0, 0],
  [0, 'D', 'D', 'C', 0, 0, 0, 0, 'B', 0],
  [0, 0, 0, 'C', 0, 0, 0, 0, 'B', 0],
  [0, 0, 0, 'C', 0, 0, 0, 0, 'B', 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 'B', 0]
];


const playerTurn = function(row, col) {

  const shipSpaces = ['C', 'B', 'R', 'S', 'D'];

  if (computerBoard[row][col] === 'X' || computerBoard[row][col] === 'M') {
    return console.log('Choose different space! Already fired here.');
  }

  if (shipSpaces.includes(computerBoard[row][col])) {
    computerBoard[row][col] = 'X';
  } else {
    computerBoard[row][col] = 'M';
  }

  for (let row of computerBoard) {
    console.log(row);
  }

  console.log('----------------------------------');

}


// for (let i = 0; i < 10; i++) {
//   playerTurn(i, i);
// }


const playerChooseBoard = function(shipType, orientation, startingPosition) {

  // this can be called after the player interacts with the UI
  // the UI will update all these variables and pass them into the function

  // shipType will determine what ship is being placed on board
  // orientation will determine if ship will be horizontal or vertical
  // startingPostion determines the beginning single space of the ship

}




