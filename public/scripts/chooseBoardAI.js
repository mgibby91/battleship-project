
// Initial board before ship placement
let computerBoardArray = [
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

const ships = {
  C: 5, // Carrier
  B: 4, // Battleship
  R: 3, // Cruiser - didn't want to be same as Carrier
  S: 3, // Submarine
  D: 2 // Destroyer
};

// AI chooses ship placement on board functions

const boardStartToEnd = function(shipLength) {

  // Starting position
  const row = Math.floor(Math.random() * 10);
  const col = Math.floor(Math.random() * 10);

  // Orientation / Direction random number (1-4)
  const randomNum = Math.floor(Math.random() * 4) + 1;

  // vertical / up
  if (randomNum === 1) {
    return [[row, col], [row, col + shipLength], 'col-up'];
  }
  // horizontal / right 
  else if (randomNum === 2) {
    return [[row, col], [row + shipLength, col], 'row-right'];
  }
  // vertical / down
  else if (randomNum === 3) {
    return [[row, col], [row, col - shipLength], 'col-down'];
  }
  // horizontal / right 
  else if (randomNum === 4) {
    return [[row, col], [row - shipLength, col], 'row-left'];
  }
}


const updateBoardCompShips = function(shipInfo) {

  const startRow = shipInfo[0][0];
  const endRow = shipInfo[1][0];
  const startCol = shipInfo[0][1];
  const endCol = shipInfo[1][1];

  if (shipInfo[2] === 'col-up') {
    for (let i = startCol; i < endCol; i++) {
      computerBoardArray[startRow][i] = shipInfo[3];
    }
  }
  else if (shipInfo[2] === 'row-right') {
    for (let i = startRow; i < endRow; i++) {
      computerBoardArray[i][startCol] = shipInfo[3];
    }
  }
  else if (shipInfo[2] === 'col-down') {
    for (let i = startCol; i > endCol; i--) {
      computerBoardArray[startRow][i] = shipInfo[3];
    }
  }
  else if (shipInfo[2] === 'row-left') {
    for (let i = startRow; i > endRow; i--) {
      computerBoardArray[i][startCol] = shipInfo[3];
    }
  }

}




// Easy mode - completely random placement
const easyShipPlacement = function() {

  let count = 0;

  while (count < 5) {

    for (let ship in ships) {

      const shipInfo = boardStartToEnd(ships[ship]);

      shipInfo.push(ship);

      // determine if ship is on board
      if (shipInfo[0][0] > 9 || shipInfo[0][1] > 9 || shipInfo[1][0] > 9 || shipInfo[1][1] > 9 ||
        shipInfo[0][0] < 0 || shipInfo[0][1] < 0 || shipInfo[1][0] < 0 || shipInfo[1][1] < 0) {
        continue;
      }

      const startRow = shipInfo[0][0];
      const endRow = shipInfo[1][0];
      const startCol = shipInfo[0][1];
      const endCol = shipInfo[1][1];


      // determine if row takes up only empty (0) spaces
      let isEmpty = true;

      // col up
      if (shipInfo[2] === 'col-up') {
        for (let i = startCol; i < endCol; i++) {
          if (computerBoardArray[startRow][i] !== 0) {
            isEmpty = false;
          }
        }
      }
      // row up
      if (shipInfo[2] === 'row-right') {
        for (let i = startRow; i < endRow; i++) {
          if (computerBoardArray[i][startCol] !== 0) {
            isEmpty = false;
          }
        }
      }
      // col up
      if (shipInfo[2] === 'col-down') {
        for (let i = startCol; i > endCol; i--) {
          if (computerBoardArray[startRow][i] !== 0) {
            isEmpty = false;
          }
        }
      }
      // row up
      if (shipInfo[2] === 'row-left') {
        for (let i = startRow; i > endRow; i--) {
          if (computerBoardArray[i][startCol] !== 0) {
            isEmpty = false;
          }
        }
      }

      if (isEmpty) {

        count++;
        delete ships[ship];

        updateBoardCompShips(shipInfo);
      }

    }
  }

}

