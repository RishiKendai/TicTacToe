// CONSTANTS
const X_CLASS = 'x';
const O_CLASS = 'o';
let X_SCORE = 0;
let O_SCORE = 0;
let DRAW_SCORE = 0;
let circleTurn;
let checkCombo = [];
const WINNING_COMBO = [
  [0, 1, 2],
  [3, 4, 5],
  [1,3,7],
  [1,5,7],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const verticalCombo = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
const horizontalCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];
const leftDiagonal = [[0, 4, 8]];
const rightDiagonal = [[2, 4, 6]];

//  SELECTORS
const cellElements = document.querySelectorAll('[data-cell]');
const strikes = document.querySelectorAll('.strike');
const board = document.querySelector('[board]');
const winningMessgeTab = document.querySelector('.winningMessgeTab');
const winningMessageText = document.querySelector('.winningMessageText');
const restart = document.querySelector('.restart');
const xTurn = document.querySelector('.xT');
const oTurn = document.querySelector('.oT');
const xScore = document.querySelector('.x.score');
const oScore = document.querySelector('.o.score');
const dScore = document.querySelector('.d.score');

// CHECK DIRECTION  AND STRIKE LINE
function checkSide() {
  const directionObj = [
    { name: 'vertical', check: verticalCombo, isTrue: false },
    { name: 'horizontal', check: horizontalCombo, isTrue: false },
    { name: 'diagonal-left', check: leftDiagonal, isTrue: false },
    { name: 'diagonal-right', check: rightDiagonal, isTrue: false },
  ];
  directionObj.forEach((array) => {
    array.isTrue = array.check.some((elements) => {
      return elements.every((index) => {
        return checkCombo.includes(index);
      });
    });
    array.isTrue &&
      checkCombo.forEach((ele) => strikes[ele].classList.add(array.name));
  });
}

// ------- INITIAL FUNCTION -------
startGame();

// EVENT LISTENER
restart.addEventListener('click', startGame);

// SET INITIAL SCORE
xScore.textContent = X_SCORE;
oScore.textContent = O_SCORE;
dScore.textContent = DRAW_SCORE;

// ------ APP STARTS HERE -------
function startGame() {
  let circleTurn = false;
  cellElements.forEach((cell, index) => {
    cell.className = 'cell'; // REMOVE ALL THE CLASS NAME AND SET INITIAL CLASS NAME
    strikes[index].className = 'strike'; // REMOVE ALL THE CLASS NAME AND SET INITIAL CLASS NAME
    winningMessgeTab.classList.remove('show'); // REMOVE CLASS NAME FOR WINNING TAB
    cell.removeEventListener('click', handleClick); // REMOVE ALL EVENT LISTENERS
    cell.addEventListener('click', handleClick, { once: true }); // LISTEN TO EACH CELL ONLY ONCE
  });
  boardHoverClass();
}

//  FUNCTION WHEN CLICK EVENT TRIGGERED
function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? O_CLASS : X_CLASS;
  placeMark(cell, currentClass); // MARK 'X' OR 'O' ON THE CELL
  if (checkWin(currentClass)) {
    // CHECK WIN
    checkSide();
    endGame(false);
  } else if (isDraw()) {
    // CHECK DRAW
    endGame(true);
  }
  swapTurns(); // ELSE SWAP THE TURN
  boardHoverClass();
}

// FUNCTION TO PLACE THE 'X' OR 'O' ON THE CELL
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

// CHECK DRAW
function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

// CHECK WIN
function checkWin(currentClass) {
  return WINNING_COMBO.some((combo) => {
    let derivedCombo = combo.every((index) => {
      if (cellElements[index].classList.contains(currentClass))
        return cellElements[index].classList.contains(currentClass);
    });
    if (derivedCombo) {
      checkCombo = combo;
    }
    return derivedCombo;
  });
}

// FUNCTION TO DISPLAY THE RESULT TAB
function endGame(draw) {
  if (draw) {
    winningMessageText.textContent = 'Draw';
    dScore.textContent = DRAW_SCORE = DRAW_SCORE + 1;
  } else {
    winningMessageText.textContent = `${circleTurn ? "O's" : "X's"} Win`;
    circleTurn
      ? (oScore.textContent = O_SCORE = O_SCORE + 1)
      : (xScore.textContent = X_SCORE = X_SCORE + 1);
    console.log(oScore.textContent);
    console.log(xScore.textContent);
  }
  setTimeout(() => {
    winningMessgeTab.classList.add('show');
  }, 1200);
}

// SWAP TURN

xTurn.addEventListener('click', () => {
  oTurn.classList.toggle('active');
  xTurn.classList.toggle('active');
});

function swapTurns() {
  circleTurn = !circleTurn;
  if (circleTurn) {
    xTurn.classList.remove('active');
    oTurn.classList.add('active');
  } else {
    oTurn.classList.remove('active');
    xTurn.classList.add('active');
  }
}

// FUNCTION TO HOVER 'X' OR 'O' ON CELL
function boardHoverClass() {
  board.className = 'board'; // REMOVE OTHER CLASSNAME AND SET DEFAULT
  if (circleTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}
