

const computerBoardContainer = document.querySelector('.computer-board-container');
const computerBoardAllCols = document.querySelectorAll('.computer-col');

computerBoardContainer.addEventListener('click', playerFireShot);

function playerFireShot(e) {

  let shipType;

  if (e.target.className.split(' ')[0] === 'computer-col') {
    const row = Number(e.target.parentElement.className.split(' ')[1][13]);
    const col = Number(e.target.className.split(' ')[1][13]);

    if (computerBoardArray[row][col] === 0) {
      // Miss
      computerBoardArray[row][col] = 'M';

    } else if (computerBoardArray[row][col] === 'X' || computerBoardArray[row][col] === 'M') {
      // already shot on space
    } else {
      // hit
      shipType = computerBoardArray[row][col];

      computerBoardArray[row][col] = 'X';
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
