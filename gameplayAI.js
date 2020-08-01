
let playerBoard = [
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


// AI gameplay

// Easy mode - completely random shots fired
const easyModeGameplay = function() {

  const row = Math.floor(Math.random() * 10);
  const col = Math.floor(Math.random() * 10);

  const shipSpaces = ['C', 'B', 'R', 'S', 'D'];

  if (shipSpaces.includes(playerBoard[row][col])) {
    playerBoard[row][col] = 'X';
    shipGetsHit(['X', [row, col]])
  } else if (playerBoard[row][col] === 0) {
    playerBoard[row][col] = 'M';
  } else if (playerBoard[row][col] === 'X' || playerBoard[row][col] === 'M') {
    easyModeGameplay();
  }

}


let targetMovesArray = [];

// update game board when there is targetMovesArray
const updatePlayerGameBoard = function() {

  // if we call updatePlayerGame() from final else if statement below, it may shift the last array from the targetMovesArray
  // this means that it will try to use an empty array below
  // therefore we need to call a random shot in place of the X or M that it would have done below and return the function
  if (!targetMovesArray.length) {
    easyModeGameplay();
    return;
  }

  const shipSpaces = ['C', 'B', 'R', 'S', 'D'];

  const row = targetMovesArray[0][0];
  const col = targetMovesArray[0][1];

  if (shipSpaces.includes(playerBoard[row][col])) {
    playerBoard[row][col] = 'X';
    targetMovesArray.shift();
    // return ['X', [row, col]];
    shipGetsHit(['X', [row, col]]);

    // BUG: if this function gets called as a result of recursion in last else if statement...
    // then the return value, which is intended to go back to the mediumModePlay function...
    // which will in turn call the shipGetsHit function.


  } else if (playerBoard[row][col] === 0) {
    playerBoard[row][col] = 'M';
    targetMovesArray.shift();
  } else if (playerBoard[row][col] === 'X' || playerBoard[row][col] === 'M') {
    targetMovesArray.shift();
    updatePlayerGameBoard();
  }

}


// if ship is hit function - for medium mode
const shipGetsHit = function(shipHitArray) {

  if (shipHitArray && shipHitArray[0] === 'X') {
    const row = shipHitArray[1][0];
    const col = shipHitArray[1][1];

    const nextMove1 = [row, col + 1];
    const nextMove2 = [row + 1, col];
    const nextMove3 = [row, col - 1];
    const nextMove4 = [row - 1, col];

    nextMoveArray = [nextMove1, nextMove2, nextMove3, nextMove4];

    // when adding nextMoves to targetMovesArray, need to make sure of two things
    // 1) nextMove is not already been played on board
    // 2) nextMove is not already in targetMovesArray
    // 3) nextMove is on board

    for (let move of nextMoveArray) {

      // if next move is not on board, continue
      if (move[0] > 9 || move[0] < 0 || move[1] > 9 || move[1] < 0) {
        continue;
      }

      // let duplicateMove = false;
      // // if next move is already is targetMovesArray
      // for (let target of targetMovesArray) {
      //   if (JSON.stringify(target) === JSON.stringify(move)) {
      //     duplicateMove = true;
      //   }
      // }

      // nextMove on playerBoard is not a past move (hit or miss), then push to targetMovesArray
      if (playerBoard[move[0]][move[1]] !== 'H' && playerBoard[move[0]][move[1]] !== 'M') {
        targetMovesArray.push(move);
      }
    }
  }
}



// Medium mode - completely random shots fired until hit, then switches to target mode (looking one away in all four directions)
const mediumModeGameplay = function() {

  if (!targetMovesArray.length) {
    // const shipHit = easyModeGameplay();

    easyModeGameplay();

    // shipGetsHit(shipHit);
  }

  // If there are valid moves in targetMovesArray, we use these over a random move
  else if (targetMovesArray.length) {

    // BUG! if it's moving through the targetMovesArray and the next target is X or M, then it does nothing

    // const shipHit = updatePlayerGameBoard();

    updatePlayerGameBoard();

    // shipGetsHit(shipHit);

  }

  for (let i = 0; i < playerBoard.length; i++) {
    console.log(playerBoard[i]);
  }

  console.log('----------------------------');

  for (let move of targetMovesArray) {
    console.log(move);
  }

}


for (let i = 0; i < 60; i++) {
  mediumModeGameplay();
}