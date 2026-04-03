const wordList = ["space","galaxy","planet","comet","asteroid","meteor","satellite","telescope",
  "astronaut","blackhole","supernova","nebula","constellation","orbit","gravity","eclipse","cosmos",,"universe","quasar","pulsar","ArtemisII","Voyager1","Hubble","MarsRover","InternationalSpaceStation","Apollo11",];

let secretWord = "";
let guessedLetters = [];
let attempts = 6;
const hangmanImg = document.querySelector(".hangman-box img");

function getRandomWord() {
  const index = Math.floor(Math.random() * wordList.length);
  return wordList[index].toUpperCase();
}

function updateAttemptsDisplay() {
  const attemptsEl = document.getElementById("attempts");
  if (attemptsEl) {
    attemptsEl.textContent = String(attempts);
  }
}

function displayGame() {
  let display = "";

  for (let i = 0; i < secretWord.length; i++) {
    const letter = secretWord.charAt(i);
    display += guessedLetters.includes(letter) ? `${letter} ` : "_ ";
  }

  const wordDisplay = document.getElementById("word-display");
  if (wordDisplay) {
    wordDisplay.textContent = display.trim();
  }
}

function resetGame() {
  guessedLetters = [];
  attempts = 6;
  updateAttemptsDisplay();
  displayGame();
}

function setDifficulty(level) {
  attempts = level;
  startGame();
}

function startGame() {
  secretWord = getRandomWord();
  guessedLetters = [];
  updateAttemptsDisplay();
  displayGame();

  const easyBtn = document.getElementById("easy-btn");
  const mediumBtn = document.getElementById("medium-btn");
  const hardBtn = document.getElementById("hard-btn");

  if (easyBtn) easyBtn.onclick = () => setDifficulty(6);
  if (mediumBtn) mediumBtn.onclick = () => setDifficulty(5);
  if (hardBtn) hardBtn.onclick = () => setDifficulty(4);
}

function guessLetter(letter) {
  if (!letter || guessedLetters.includes(letter)) return;

  guessedLetters.push(letter);

  if (!secretWord.includes(letter)) {
    attempts = Math.max(0, attempts - 1);
    updateAttemptsDisplay();

    if (hangmanImg) {
      const step = 6 - attempts;
      hangmanImg.src = `${step}.png`;
    }
  }

  displayGame();
}

function pressLetter(letter) {
  guessLetter(letter);
}

document.addEventListener("DOMContentLoaded", () => {
  startGame();

  const resetBtn = document.getElementById("reset-btn");
  if (resetBtn) resetBtn.addEventListener("click", () => startGame());
});
