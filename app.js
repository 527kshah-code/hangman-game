const wordList = ["space","galaxy","planet","comet","asteroid","meteor","satellite","telescope",
  "astronaut","blackhole","supernova","nebula","constellation","orbit","gravity","eclipse","cosmos",
  "universe","quasar","pulsar","ArtemisII","Voyager1","Hubble","MarsRover","InternationalSpaceStation","Apollo11",];

let attempts = 6;
const hangmanImg = document.querySelector(".hangman-box img");

function getRandomWord() {
  const index = Math.floor(Math.random() * wordList.length);
  return wordList[index].toUpperCase();
}

let secretWord = getRandomWord();

function updateAttemptsDisplay() {
  const attemptsEl = document.getElementById("attempts");
  if (attemptsEl) {
    attemptsEl.textContent = String(attempts);
  }
}
let wrongGuesses = [];
let guessedLetters =[];

function displayWord() {
  let display = "";

  for (let i = 0; i < secretWord.length; i++) {
    const letter = secretWord[i];

    if (guessedLetters.includes(letter)) {
      display += letter + " ";
    } else {
      display += "_ ";
    }
  }

  const wordEl = document.getElementById("secretWord");
  if (wordEl) {
    wordEl.textContent = display.trim();
  }
}

function resetGame() {
  guessedLetters = [];
  attempts = 6;
  updateAttemptsDisplay();
  displayWord();
}

function setDifficulty(level) {
  attempts = level;
  startGame();
}

function startGame() {
  secretWord = getRandomWord();
  guessedLetters = [];
  updateAttemptsDisplay();
  displayWord();

  const easyBtn = document.getElementById("easy-btn");
  const mediumBtn = document.getElementById("medium-btn");
  const hardBtn = document.getElementById("hard-btn");

  if (easyBtn) easyBtn.onclick = () => setDifficulty(6);
  if (mediumBtn) mediumBtn.onclick = () => setDifficulty(5);
  if (hardBtn) hardBtn.onclick = () => setDifficulty(4);
}

function pressLetter(letter) {
  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
  }

  if (!secretWord.includes(letter) && !wrongGuesses.includes(letter)) {
    wrongGuesses.push(letter);
    attempts--;
    updateAttemptsDisplay();
  }
  displayWord();
}


document.addEventListener("DOMContentLoaded", () => {
  startGame();

  const resetBtn = document.getElementById("reset-btn");
  if (resetBtn) resetBtn.addEventListener("click", () => startGame());
});

