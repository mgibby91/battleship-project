
let playerBoardArray = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];


// AI gameplay

// Easy mode - completely random shots fired
const easyModeGameplay = function() {

  const row = Math.floor(Math.random() * 10);
  const col = Math.floor(Math.random() * 10);

  const shipSpaces = ['C', 'B', 'R', 'S', 'D'];

  if (shipSpaces.includes(playerBoardArray[row][col])) {
    shipType = playerBoardArray[row][col];
    playerBoardArray[row][col] = 'X';
    shipGetsHit(['X', [row, col]]);

    const isShipSunk = determineShipSunk(playerBoardArray, shipType);
    updatePreviousShotsList(row, col, 'Computer', 'HIT', isShipSunk);
  } else if (playerBoardArray[row][col] === 0) {
    playerBoardArray[row][col] = 'M';
    updatePreviousShotsList(row, col, 'Computer', 'MISS');
  } else if (playerBoardArray[row][col] === 'X' || playerBoardArray[row][col] === 'M') {
    easyModeGameplay();
  }

}


let targetMovesArray = [];

// update game board when there is targetMovesArray
const updatePlayerGameBoard = function() {

  if (!targetMovesArray.length) {
    easyModeGameplay();
    return;
  }

  const shipSpaces = ['C', 'B', 'R', 'S', 'D'];

  const row = targetMovesArray[0][0];
  const col = targetMovesArray[0][1];

  if (shipSpaces.includes(playerBoardArray[row][col])) {
    shipType = playerBoardArray[row][col];
    playerBoardArray[row][col] = 'X';
    targetMovesArray.shift();
    shipGetsHit(['X', [row, col]]);

    const isShipSunk = determineShipSunk(playerBoardArray, shipType);
    updatePreviousShotsList(row, col, 'Computer', 'HIT', isShipSunk);

  } else if (playerBoardArray[row][col] === 0) {
    playerBoardArray[row][col] = 'M';
    targetMovesArray.shift();
    updatePreviousShotsList(row, col, 'Computer', 'MISS');
  } else if (playerBoardArray[row][col] === 'X' || playerBoardArray[row][col] === 'M') {
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

    for (let move of nextMoveArray) {

      // if next move is not on board, continue
      if (move[0] > 9 || move[0] < 0 || move[1] > 9 || move[1] < 0) {
        continue;
      }

      // nextMove on playerBoardArray is not a past move (hit or miss), then push to targetMovesArray
      if (playerBoardArray[move[0]][move[1]] !== 'H' && playerBoardArray[move[0]][move[1]] !== 'M') {
        targetMovesArray.push(move);
      }
    }
  }
}



// Medium mode - completely random shots fired until hit, then switches to target mode (looking one away in all four directions)
const mediumModeGameplay = function() {

  if (!targetMovesArray.length) {
    easyModeGameplay();
  }

  // If there are valid moves in targetMovesArray, we use these over a random move
  else if (targetMovesArray.length) {
    updatePlayerGameBoard();
  }

}

