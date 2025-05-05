'use strict';

// DOM elements.
const dice = document.querySelector('.dice');

const players = document.querySelectorAll('.player');
const playerOneTotalScore = document.getElementById('player1-total-score');
const playerTwoTotalScore = document.getElementById('player2-total-score');

const playerOneCurrentScore = document.getElementById('player1-current-score');
const playerTwoCurrentScore = document.getElementById('player2-current-score');

// Buttons
const newGameButton = document.querySelector('.btn--new');
const rollDiceButton = document.querySelector('.btn--rolldice');
const holdDiceButton = document.querySelector('.btn--hold');

let currentPlayer = 1;
let currentDice = 1;
let currentScores = [0, 0];
let isPlaying = true;
let totalScores = [0, 0];

function rollDie() {
  const MIN_DICE_VALUE = 1;
  const MAX_DICE_VALUE = 6;
  return Math.floor(Math.random() * (MAX_DICE_VALUE - MIN_DICE_VALUE + 1) + MIN_DICE_VALUE);
}

function switchPlayer() {
  if (currentPlayer === 1) {
    playerOneCurrentScore.textContent = 0;
    currentPlayer = 2;
  } else {
    playerTwoCurrentScore.textContent = 0;
    currentPlayer = 1;
  }
  players.forEach(el => el.classList.toggle('player--active'));
}

function resetGame() {
  currentPlayer = 1;
  currentDice = 1;
  currentScores.fill(0);
  totalScores.fill(0);

  playerOneCurrentScore.textContent = 0;
  playerTwoCurrentScore.textContent = 0;
  playerOneTotalScore.textContent = 0;
  playerTwoTotalScore.textContent = 0;

  dice.classList.add('hidden');
  players.forEach(el => el.classList.remove('player--active'));
  players[currentPlayer].classList.add('player--active');
  players.forEach(el => el.classList.remove('player--win'));

  isPlaying = true;
}

function updateCurrentScoreOnUI() {
  currentPlayer === 1
    ? (playerOneCurrentScore.textContent = currentScores[0])
    : (playerTwoCurrentScore.textContent = currentScores[1]);
}

function updateTotalScoreOnUI() {
  currentPlayer === 1
    ? (playerOneTotalScore.textContent = totalScores[0])
    : (playerTwoTotalScore.textContent = totalScores[1]);
}

rollDiceButton.addEventListener('click', () => {
  if (isPlaying) {
    currentDice = rollDie();
    let diceImage = `dice-${currentDice}.png`;

    dice.src = `./img/${diceImage}`;
    dice.classList.remove('hidden');

    if (currentDice === 1) {
      switchPlayer();
      return;
    }

    currentScores[currentPlayer - 1] += currentDice;
    updateCurrentScoreOnUI();
  }
});

holdDiceButton.addEventListener('click', function () {
  if (isPlaying) {
    totalScores[currentPlayer - 1] += currentScores[currentPlayer - 1];
    updateTotalScoreOnUI();

    if (totalScores[currentPlayer - 1] >= 10) {
      dice.classList.add('hidden');

      players.forEach(el => el.classList.remove('player--active'));
      players[currentPlayer - 1].classList.add('player--win');
      isPlaying = false;
    } else {
      switchPlayer();
    }
  }
});

newGameButton.addEventListener('click', function () {
  resetGame();
});
