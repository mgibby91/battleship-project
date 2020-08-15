


// Select buttons for ship placement

class ShipButtons {

  constructor(horizontalBtn, verticalBtn, allShipBtns, shipsDisplay) {
    this.horizontalBtn = horizontalBtn;
    this.verticalBtn = verticalBtn;
    this.allShipBtns = allShipBtns;
    this.shipsDisplay = shipsDisplay;


    horizontalBtn.addEventListener('click', this.selectHorizontalBtn);
    verticalBtn.addEventListener('click', this.selectVerticalBtn);
    shipsDisplay.addEventListener('click', this.selectShip);
  }

  selectHorizontalBtn() {

    verticalBtn.classList.remove('orientation-selected');
    horizontalBtn.classList.add('orientation-selected');

  }

  selectVerticalBtn() {

    verticalBtn.classList.add('orientation-selected');
    horizontalBtn.classList.remove('orientation-selected');

  }

  selectShip(e) {

    if (e.target.className.slice(0, 9) === 'ship ship') {

      for (let ship of allShipBtns) {
        ship.classList.remove('ship-selected');
      }
      e.target.classList.add('ship-selected');
    }
  }

}

const horizontalBtn = document.querySelector('#horizontal');
const verticalBtn = document.querySelector('#vertical');
const allShipBtns = document.querySelectorAll('.ship');
const shipsDisplay = document.querySelector('.ships-display');

const shipBtns = new ShipButtons(horizontalBtn, verticalBtn, allShipBtns, shipsDisplay);



// Ship placement on board
class ShipPlacement {

  constructor(playerBoard, playerBoardAllCols, playerResetShipBtn) {
    this.playerBoard = playerBoard;
    this.playerBoardAllCols = playerBoardAllCols;
    this.playerResetShipBtn = playerResetShipBtn;
    this.isOnBoard = true;

    playerBoard.addEventListener('mouseover', this.highlightShipPlacement);
    playerBoard.addEventListener('mouseleave', this.removeHighlightShipPlacement);
    playerBoard.addEventListener('click', this.chooseShipPlacement);
    playerResetShipBtn.addEventListener('click', this.resetShipPlacement);
  }

  highlightShipPlacement(e) {

    // Remove any highlighted color on board to start
    for (let col of playerBoardAllCols) {
      col.style.background = 'lightskyblue';
    }

    if (e.target.className.split(' ')[0] === 'player-col') {

      const orientationBtnSelected = document.querySelector('.orientation-selected');
      const shipSelectedText = document.querySelector('.ship-selected').textContent;
      const shipNum = Number(shipSelectedText.slice(shipSelectedText.length - 2, shipSelectedText.length - 1));
      const currentColNum = Number(e.target.className.split(' ')[1][e.target.className.split(' ')[1].length - 1]);
      const parentRow = e.target.parentElement;

      // Logic to highlight possible ship spaces horizontally
      if (orientationBtnSelected.id === 'horizontal') {

        const parentRowAllChildren = parentRow.children;

        this.isOnBoard = true;

        for (let i = currentColNum; i < shipNum + currentColNum; i++) {
          if (i > 9) {
            this.isOnBoard = false;
            continue;
            // Add logic to turn entire ship red when off board
          };

          const currentSpace = parentRowAllChildren[i];
          currentSpace.style.background = 'lightseagreen';
        }
      }

      // Logic to hightlight possible ship spaces vertically
      else if (orientationBtnSelected.id === 'vertical') {

        this.isOnBoard = true;

        const parentRowNum = Number(parentRow.className.split(' ')[1][parentRow.className.split(' ')[1].length - 1]);

        for (let i = parentRowNum; i < parentRowNum + shipNum; i++) {
          const currentRow = document.querySelector(`.player-row.player-row-${i}`);

          if (i > 9) {
            this.isOnBoard = false;
            continue
          };


          for (let col of currentRow.children) {
            if (col.className.split(' ')[1] === `player-col-${currentColNum}`) {
              col.style.background = 'lightseagreen';
            }
          }
        }
      }
    }
  }

  removeHighlightShipPlacement() {

    for (let col of playerBoardAllCols) {
      col.style.background = 'lightskyblue'
      // conditional if not className for ship selection
    }

  }

  chooseShipPlacement(e) {

    // Logic to prevent ship from being placed on another ship
    // Probably turn it red if it hovers over other ship

    if (this.isOnBoard) {

      // Check to see if ships are overlapping
      for (let col of playerBoardAllCols) {
        if (col.style.background === 'lightseagreen' && col.className.split(' ')[2]) {
          return;
        }
      }

      for (let col of playerBoardAllCols) {
        if (col.style.background === 'lightseagreen') {
          col.classList.add('ship-placement-selected');
          const shipType = document.querySelector('.ship-selected').textContent;
          if (shipType.slice(0, 7) === 'Carrier') col.classList.add('C');
          else if (shipType.slice(0, 10) === 'Battleship') col.classList.add('B');
          else if (shipType.slice(0, 7) === 'Cruiser') col.classList.add('R');
          else if (shipType.slice(0, 9) === 'Submarine') col.classList.add('S');
          else if (shipType.slice(0, 9) === 'Destroyer') col.classList.add('D');
        }
      }

      // remove btn of ship that was placed on board and remove ship selected class from all btns
      for (let btn of allShipBtns) {
        if (btn.className.split(' ')[2] === 'ship-selected') {
          btn.style.display = 'none';
        }
        btn.classList.remove('ship-selected');
      }

      // if there are shipbtns that are shown, add ship selected to next available one
      for (let btn of allShipBtns) {
        if (btn.style.display !== 'none') {
          btn.classList.add('ship-selected');
          break;
        }
      }


      // Check to see if all ships have been placed and display the start game buttons
      for (let btn of allShipBtns) {
        if (btn.style.display !== 'none') {
          return;
        }
      }

      document.querySelector('.start-game-container').style.display = 'flex';
      document.querySelector('.ships-display').style.height = '25px';

    }

    // turn red on click
    if (!this.isOnBoard) {
      for (let col of playerBoardAllCols) {
        if (col.style.background === 'lightseagreen') {
          col.style.background = 'red';
        }
      }
    }

  }

  resetShipPlacement() {

    for (let btn of allShipBtns) {
      btn.style.display = 'flex';
      btn.classList.remove('ship-selected');
    }

    allShipBtns[0].classList.add('ship-selected');

    for (let col of playerBoardAllCols) {
      col.classList.remove('ship-placement-selected');
      col.classList.remove('C');
      col.classList.remove('B');
      col.classList.remove('R');
      col.classList.remove('S');
      col.classList.remove('D');
    }

    document.querySelector('.start-game-container').style.display = 'none';
    document.querySelector('.ships-display').style.height = '';

  }

}

const playerBoard = document.querySelector('.player-board-container');
const playerBoardAllCols = document.querySelectorAll('.player-col');
const playerResetShipBtn = document.querySelector('.reset-ships-btn');

const shipPlacement = new ShipPlacement(playerBoard, playerBoardAllCols, playerResetShipBtn);



class StartGame {
  constructor(difficultyButtonContainer, easyButton, mediumButton, startGameButton) {
    this.difficultyButtonContainer = difficultyButtonContainer;
    this.easyButton = easyButton;
    this.mediumButton = mediumButton;
    this.startGameButton = startGameButton;

    difficultyButtonContainer.addEventListener('click', this.toggleDifficulty);
    startGameButton.addEventListener('click', this.startGame);
    startGameButton.addEventListener('click', this.updateShipsDB);
  }

  toggleDifficulty(e) {

    if (e.target.className.split(' ')[1] === 'difficulty-button') {
      easyButton.classList.remove('difficulty-selected');
      mediumButton.classList.remove('difficulty-selected');

      e.target.classList.add('difficulty-selected');
    }

  }


  startGame = () => {

    playerBoardArray = [
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

    computerBoardArray = [
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

    const chosenDifficulty = document.querySelector('.difficulty-selected').textContent.toLowerCase();

    // map difficulty chosen to function that AI will use for their turn
    // logic for player shooting on computer board
    // turn player-ships-container into previos moves chart

    this.setPlayerShips();
    easyShipPlacement();

    document.querySelector('.computer-board-container').style.pointerEvents = 'all';
  }

  setPlayerShips() {

    for (let col of playerBoardAllCols) {
      if (col.className.split(' ')[2] === 'ship-placement-selected') {
        const row = Number(col.parentElement.className.split(' ')[1][col.parentElement.className.split(' ')[1].length - 1]);
        const column = Number(col.className.split(' ')[1][col.className.split(' ')[1].length - 1]);
        const shipSymbol = col.className.split(' ')[3];

        playerBoardArray[row][column] = shipSymbol;
      }
    }

  }

  updateShipsDB() {

    const shipsData = {
      compBoardArray: computerBoardArray,
      playBoardArray: playerBoardArray
    };

    console.log(shipsData);

    $.post({
      url: '/ships',
      data: JSON.stringify(shipsData),
      contentType: 'application/json',
    })
      .then(function() {
        console.log('DB has been updated with initial ship placement');
      })
      .catch(function() {
        console.log('Error thrown');
      })

  }

}


const difficultyButtonContainer = document.querySelector('.difficulty-button-container');
const easyButton = document.querySelector('.easy-button');
const mediumButton = document.querySelector('.medium-button');
const startGameButton = document.querySelector('.start-game-button');

const startGame = new StartGame(difficultyButtonContainer, easyButton, mediumButton, startGameButton);


