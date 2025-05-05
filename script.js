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
let currentScore = [0, 0];
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
  currentScore = 0;
  totalScores.forEach(el => (el = 0));

  updateCurrentScoreOnUI(currentScore);
  updateTotalScoreOnUI();

  dice.classList.add('hidden');
  players.forEach(el => el.classList.remove('player--active'));
  players[currentPlayer - 1].classList.add('player--win');
}

function updateCurrentScoreOnUI(currentScore) {
  let currentScoreOnUI = 0;

  // currentPlayer === 1
  //   ? (currentScoreOnUI = +playerOneCurrentScore.textContent)
  //   : (currentScoreOnUI = +playerTwoCurrentScore.textContent);

  // currentScoreOnUI += currentScore;

  currentPlayer === 1
    ? (playerOneCurrentScore.textContent = currentScore[0])
    : (playerTwoCurrentScore.textContent = currentScore[0]);
}

function updateTotalScoreOnUI() {
  currentPlayer === 1
    ? (totalScores[0] += +playerOneCurrentScore.textContent)
    : (totalScores[1] += +playerTwoCurrentScore.textContent);

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

    currentScore[currentPlayer - 1] += currentDice;
    updateCurrentScoreOnUI(currentScore);
  }
});

holdDiceButton.addEventListener('click', function () {
  if (isPlaying) {
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
