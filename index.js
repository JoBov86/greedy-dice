const diceIcons = [
  "./images/dice-face-1.png",
  "./images/dice-face-2.png",
  "./images/dice-face-3.png",
  "./images/dice-face-4.png",
  "./images/dice-face-5.png",
  "./images/dice-face-6.png",
];

let p1total = 0;
let p2total = 0;
let p1BankTotal = 0;
let p2BankTotal = 0;
let playerTurn = 0;
const die1Display = document.getElementById("die-1");
const die2Display = document.getElementById("die-2");
const p1TotalDisplay = document.getElementById("p1-total");
const p2TotalDisplay = document.getElementById("p2-total");
const p1BankDisplay = document.getElementById("p1-bank-total");
const p2BankDisplay = document.getElementById("p2-bank-total");
const p1RollButton = document.getElementById("p1-roll-btn");
const p2RollButton = document.getElementById("p2-roll-btn");
const p1BankButton = document.getElementById("p1-bank-btn");
const p2BankButton = document.getElementById("p2-bank-btn");
const p2DiceArea = document.querySelector(".p2-dice-area");
const p1DiceArea = document.querySelector(".p1-dice-area");
const turnDisplay = document.getElementById("turn-display");
const winnerDisplay = document.getElementById("winner-display");
const gameIntro = document.getElementById("game-started");
const gameMain = document.getElementById("game-not-started");
const p1Title = document.getElementById("player-1-display");
const p2Title = document.getElementById("player-2-display");
const dice1Bg = document.getElementById("dice-1-img-bg");
const dice2Bg = document.getElementById("dice-2-img-bg");
const backgroundDiv = document.querySelector(".bg-color");

function choseWhoStarts() {
  gameIntro.style.display = "block";
  gameMain.style.display = "none";
  p1total = 0;
  p2total = 0;
  p1BankTotal = 0;
  p2BankTotal = 0;
  die1Display.src = diceIcons[0];
  die2Display.src = diceIcons[0];
  p1TotalDisplay.innerText = "0";
  p2TotalDisplay.innerText = "0";
  p1BankDisplay.innerText = "0";
  p2BankDisplay.innerText = "0";
  winnerDisplay.innerText = "";
  let randNum = Math.floor(Math.random() * 2);
  backgroundDiv.classList.remove("bg-color-sml");

  if (randNum % 2 === 0) {
    p1Turn();
  } else {
    p2Turn();
  }
}
function randomDiceNum() {
  return Math.floor(Math.random() * 6);
}

function handleP1Click() {
  dice1Wiggle();
  const randomDiceAmmount = randomDiceNum();
  const randomDiceFace = diceIcons[randomDiceAmmount];
  if (randomDiceAmmount === 0) {
    dice1Bg.classList.remove("green");
    dice1Bg.classList.add("red");
    p1TotalDisplay.innerText = "0";
    die1Display.src = diceIcons[0];
    p2Turn();
  } else {
    dice1Bg.classList.remove("red");
    dice1Bg.classList.add("green");
    die1Display.src = randomDiceFace;
    p1TotalDisplay.innerText = p1total += randomDiceAmmount + 1;
  }
}

function handleP2Click() {
  dice2Wiggle();
  const randomDiceAmmount = randomDiceNum();
  const randomDiceFace = diceIcons[randomDiceAmmount];
  if (randomDiceAmmount === 0) {
    dice2Bg.classList.remove("green");
    dice2Bg.classList.add("red");
    p2TotalDisplay.innerText = "0";
    die2Display.src = diceIcons[0];
    p1Turn();
  } else {
    dice2Bg.classList.remove("red");
    dice2Bg.classList.add("green");
    die2Display.src = randomDiceFace;
    p2TotalDisplay.innerText = p2total += randomDiceAmmount + 1;
  }
}

function bankP1Score() {
  p1BankDisplay.innerText = p1BankTotal += p1total;
  p1TotalDisplay.innerText = "0";
  p2Turn();
}

function bankP2Score() {
  p2BankDisplay.innerText = p2BankTotal += p2total;
  p2TotalDisplay.innerText = "0";
  p1Turn();
}

function p1Turn() {
  p1DiceArea.classList.add("active-player");
  p2DiceArea.classList.remove("active-player");
  p1Title.classList.add("active-text");
  p2Title.classList.remove("active-text");
  p1total = 0;
  disableP2Btns();
  checkForWinner();
}

function p2Turn() {
  p2DiceArea.classList.add("active-player");
  p1DiceArea.classList.remove("active-player");
  p2Title.classList.add("active-text");
  p1Title.classList.remove("active-text");
  p2total = 0;
  disableP1Btns();
  checkForWinner();
}

function checkForWinner() {
  if (p1BankTotal >= 100) {
    p1DiceArea.classList.remove("active-player");
    p2DiceArea.classList.remove("active-player");
    winnerDisplay.innerText = "PLAYER 1 WINS!!!";
    disableAllButtons();
  } else if (p2BankTotal >= 100) {
    p1DiceArea.classList.remove("active-player");
    p2DiceArea.classList.remove("active-player");
    winnerDisplay.innerText = "PLAYER 2 WINS!!!";
    disableAllButtons();
  }
}

function playAgain() {
  gameIntro.style.display = "none";
  gameMain.style.display = "block";
  backgroundDiv.classList.add("bg-color-sml");
  winnerDisplay.innerText = "";
}

function disableP1Btns() {
  p2RollButton.classList.remove("disabled");
  p2BankButton.classList.remove("disabled");
  p1RollButton.classList.add("disabled");
  p1BankButton.classList.add("disabled");
  p2RollButton.disabled = false;
  p2BankButton.disabled = false;
  p1RollButton.disabled = true;
  p1BankButton.disabled = true;
}

function disableP2Btns() {
  p1RollButton.classList.remove("disabled");
  p1BankButton.classList.remove("disabled");
  p2RollButton.classList.add("disabled");
  p2BankButton.classList.add("disabled");
  p1RollButton.disabled = false;
  p1BankButton.disabled = false;
  p2RollButton.disabled = true;
  p2BankButton.disabled = true;
}

function disableAllButtons() {
  p1RollButton.classList.add("disabled");
  p1BankButton.classList.add("disabled");
  p2RollButton.classList.add("disabled");
  p2BankButton.classList.add("disabled");
  p1RollButton.disabled = true;
  p1BankButton.disabled = true;
  p2RollButton.disabled = true;
  p2BankButton.disabled = true;
}

function dice1Wiggle() {
  die1Display.classList.add("roll-animation");
  setTimeout(() => {
    removeDice1Wiggle();
  }, 500);
}

function dice2Wiggle() {
  die2Display.classList.add("roll-animation");
  setTimeout(() => {
    removeDice2Wiggle();
  }, 500);
}

function removeDice1Wiggle() {
  die1Display.classList.remove("roll-animation");
}

function removeDice2Wiggle() {
  die2Display.classList.remove("roll-animation");
}
