

const computerBoardContainer = document.querySelector('.computer-board-container');
const computerBoardAllCols = document.querySelectorAll('.computer-col');

computerBoardContainer.addEventListener('click', playerFireShot);

// CLASS firing shots here to...

function playerFireShot(e) {

  let shipType;

  if (e.target.className.split(' ')[0] === 'computer-col') {
    const row = Number(e.target.parentElement.className.split(' ')[1][13]);
    const col = Number(e.target.className.split(' ')[1][13]);

    if (computerBoardArray[row][col] === 0) {
      // Miss
      computerBoardArray[row][col] = 'M';
      updatePreviousShotsList(row, col, 'Player', 'MISS');

    } else if (computerBoardArray[row][col] === 'X' || computerBoardArray[row][col] === 'M') {
      // already shot on space
    } else {
      // hit
      shipType = computerBoardArray[row][col];

      computerBoardArray[row][col] = 'X';

      const isShipSunk = determineShipSunk(computerBoardArray, shipType);
      updatePreviousShotsList(row, col, 'Player', 'HIT', isShipSunk);
    }

    updateComputerBoardUI();

    // delay for computer turn
    computerFireShot();
  }
}

function updateComputerBoardUI() {

  for (let compCol of computerBoardAllCols) {
    const row = compCol.parentElement.className.split(' ')[1][13];
    const column = compCol.className.split(' ')[1][13];

    compCol.classList.remove('player-miss');
    compCol.classList.remove('player-hit');

    if (computerBoardArray[row][column] === 'M') {
      compCol.classList.add('player-miss');
    } else if (computerBoardArray[row][column] === 'X') {
      compCol.classList.add('player-hit');
    }
  }

}

function computerFireShot() {

  // prevent user from firing again
  computerBoardContainer.style.pointerEvents = 'none';

  // delay AI firing for effect
  setTimeout(function() {

    if (easyButton.className.split(' ')[2]) {
      easyModeGameplay();
    } else if (mediumButton.className.split(' ')[2]) {
      mediumModeGameplay();
    }

    updatePlayerBoardUI();

    // re-enable pointer events for computer board
    computerBoardContainer.style.pointerEvents = 'all';

  }, 2000);


}


function updatePlayerBoardUI() {

  for (let playerCol of playerBoardAllCols) {
    const row = Number(playerCol.parentElement.className.split(' ')[1][11]);
    const column = Number(playerCol.className.split(' ')[1][11]);

    playerCol.classList.remove('player-miss');
    playerCol.classList.remove('player-hit');

    if (playerBoardArray[row][column] === 'M') {
      playerCol.classList.add('player-miss');
    } else if (playerBoardArray[row][column] === 'X') {
      playerCol.classList.add('player-hit');
    }
  }

}

// .....to here (CLASS firing shots);

function updatePreviousShotsList(row, col, playerType, shotSuccess, shipSunk) {

  const rowAlphaCoords = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  const messageHTML = `<p>${playerType} fires ${rowAlphaCoords[row]}${col + 1}: ${shotSuccess}</p>`;

  document.querySelector('.previous-shots-list').insertAdjacentHTML('afterbegin', messageHTML);

  if (shipSunk) {

    const shipSunkMessageHTML = `<p>${playerType} sinks a ${shipSunk}!`;
    // for effect!
    setTimeout(() => {
      document.querySelector('.previous-shots-list').insertAdjacentHTML('afterbegin', shipSunkMessageHTML);
    }, 500);

  }
}


function determineShipSunk(boardType, shipType) {

  for (let position of boardType) {
    if (position.includes(shipType)) {
      return false;
    }
  }

  const shipNames = {
    C: 'Carrier', // Carrier
    B: 'Battleship', // Battleship
    R: 'Cruiser', // Cruiser - didn't want to be same as Carrier
    S: 'Submarine', // Submarine
    D: 'Destroyer' // Destroyer
  };

  return shipNames[shipType];

}



$(() => {

  $.ajax('/ships', { method: 'GET' })
    .then(function(shipsArrays) {
      console.log(shipsArrays);

      if (shipsArrays.playBoardArray.length && shipsArrays.compBoardArray.length) {
        playerBoardArray = shipsArrays.playBoardArray;
        computerBoardArray = shipsArrays.compBoardArray;

        // next step is to implement a post on every shot fire for both player and cpu
        // also figure out how to update player board with ships AND shots fired 
        // ... above doesn't work with current update player board func b/c doesn't take into account ships
      }
    })
    .catch(function(err) {
      console.log('Error! ', err);
    });


});



// Remaining
// - random amount of time for computer to shoot shot! between 0.5 - 2 s
// - use spinner for computer thinking about shot
// - show sunken ship after all hits on ship 
// - hook up to server and render pages from there
// - use EJS for decreasing lines of HTML
// - use DB (or maybe local storage) for storing game state (refresh page and still have active game)
// - display all previous moves
// - function to determine if ship has sunk for above
// - put A-H and 1-10 around the boards
// - leaderboard for games against AI