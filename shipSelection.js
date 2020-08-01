
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
const playerBoard = document.querySelector('.player-board-container');
const playerBoardAllCols = document.querySelectorAll('.col');

// for determining if entire ship is placed on board;
let isOnBoard;

playerBoard.addEventListener('mouseover', highlightShipPlacement);
playerBoard.addEventListener('mouseleave', removeHighlightShipPlacement);

playerBoard.addEventListener('click', chooseShipPlacement);

function highlightShipPlacement(e) {

  // Remove any highlighted color on board to start
  for (let col of playerBoardAllCols) {
    col.style.background = 'lightskyblue';
  }

  if (e.target.className.slice(0, 3) === 'col') {

    const orientationBtnSelected = document.querySelector('.orientation-selected');
    const shipSelectedText = document.querySelector('.ship-selected').textContent;
    const shipNum = Number(shipSelectedText.slice(shipSelectedText.length - 2, shipSelectedText.length - 1));
    const currentColNum = Number(e.target.className[8]);
    const parentRow = e.target.parentElement;


    // Logic to highlight possible ship spaces horizontally
    if (orientationBtnSelected.id === 'horizontal') {

      const parentRowAllChildren = parentRow.children;

      isOnBoard = true;

      for (let i = currentColNum; i < shipNum + currentColNum; i++) {
        if (i > 9) {
          isOnBoard = false;
          continue
          // Add logic to turn entire ship red when off board
        };

        const currentSpace = parentRowAllChildren[i];
        currentSpace.style.background = 'lightcoral';
      }
    }

    // Logic to hightlight possible ship spaces vertically
    else if (orientationBtnSelected.id === 'vertical') {

      isOnBoard = true;

      const parentRowNum = Number(parentRow.className[8]);

      for (let i = parentRowNum; i < parentRowNum + shipNum; i++) {
        const currentRow = document.querySelector(`.row.row-${i}`);

        if (i > 9) {
          isOnBoard = false;
          continue
        };

        for (let col of currentRow.children) {
          if (col.className.slice(0, 9) === `col col-${currentColNum}`) {
            col.style.background = 'lightcoral';
          }
        }
      }
    }

  }
}

// Once mouse leaves entire board, need to reset all squares back to normal
function removeHighlightShipPlacement() {

  for (let col of playerBoardAllCols) {
    col.style.background = 'lightskyblue'
    // conditional if not className for ship selection
  }

}


// NEXT LOGIC:
// - when ship is highlighted over and player clicks, add ship to board... then remove it from ship display container
// - conditional such that ship cannot be placed on board when part of it is off board
// - make different ships different colors... have that represented in ship display container



function chooseShipPlacement(e) {

  // Logic to prevent ship from being placed on another ship
  // Probably turn it red if it hovers over other ship

  if (isOnBoard) {

    // Check to see if ships are overlapping
    for (let col of playerBoardAllCols) {
      if (col.style.background === 'lightcoral' && col.className.split(' ')[2]) {
        return;
      }
    }

    for (let col of playerBoardAllCols) {
      if (col.style.background === 'lightcoral') {
        col.classList.add('ship-placement-selected');
      }
    }

    for (let btn of allShipBtns) {
      if (btn.className.split(' ')[2] === 'ship-selected') {
        btn.style.display = 'none';
      }
      btn.classList.remove('ship-selected');
    }

  }

  // turn red on click
  if (!isOnBoard) {
    for (let col of playerBoardAllCols) {
      if (col.style.background === 'lightcoral') {
        col.style.background = 'red';
      }
    }
  }

}












