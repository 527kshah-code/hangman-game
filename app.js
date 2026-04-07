const wordList = ["space","galaxy","planet","comet","asteroid","meteor","satellite","telescope",
  "astronaut","blackhole","supernova","nebula","constellation","orbit","gravity","eclipse","cosmos",
  "universe","quasar","pulsar","ArtemisII","Voyager1","Hubble","MarsRover","InternationalSpaceStation","Apollo",];

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

function setDifficulty(level) {
  attempts = level;
  startGame();
}

function startGame() {
  secretWord = getRandomWord();

  guessedLetters = [];
  wrongGuesses = [];

  attempts = 6;

  updateAttemptsDisplay();

  displayWord();

  document.getElementById("wrong-letters").textContent = "";

   if (hangmanImg) {
    hangmanImg.src = "1.png";
  }
}

function decreaseAttempts() {
  attempts--;
  updateAttemptsDisplay();
  if (hangmanImg) {
    hangmanImg.src = `${7 - attempts}.png`;
  }
}

function pressLetter(letter) {
  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
  }

  if (!secretWord.includes(letter) && !wrongGuesses.includes(letter)) {
    wrongGuesses.push(letter);
    decreaseAttempts();
     document.getElementById("wrong-letters").textContent =
      wrongGuesses.join(" ");
  }
  displayWord();

  const winCondition = secretWord.split("").every(letter =>
    guessedLetters.includes(letter)
  );

  const loseCondition = attempts <= 0;

  if (winCondition) {
    gameOver(true);
  } else if (loseCondition) {
    gameOver(false);
  }
}
/*Ai helped with the popup for the game over message*/
const gameOver = (winCondition) => {
  const popup = document.getElementById("game-popup");
  const message = document.getElementById("popup-message");
  if (winCondition) {
    message.textContent = "Yay!😸 You Win! Your word was " + secretWord +".";
  } else {
    message.textContent = "Oh no!😿 You Lose! Your word was " + secretWord + ".";
  }
  popup.classList.remove("hidden");
};


document.addEventListener("DOMContentLoaded", () => {
  startGame();

  document.getElementById("play-again").addEventListener("click", () => {
    document.getElementById("game-popup").classList.add("hidden");
    startGame();
  });
});