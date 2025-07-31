
// Get references to the buttons and displays (using class selectors)
const rockButton = document.querySelector(".rock-btn");
const paperButton = document.querySelector(".paper-btn");
const scissorsButton = document.querySelector(".scissors-btn");

const playerScoreDisplay = document.getElementById("playerScore");
const computerScoreDisplay = document.getElementById("computerScore");
const resultDisplay = document.getElementById("result");
const choicesDisplay = document.getElementById("choices");
const winner = document.querySelector(".winner");

let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}
let gameOver = false;
function playRound(human, computer) {
  
  if (human === computer) {
    resultDisplay.textContent = "It's a draw!";
  } else if (
    (human === "rock" && computer === "scissors") ||
    (human === "paper" && computer === "rock") ||
    (human === "scissors" && computer === "paper")
  ) {
    humanScore += 1;
    resultDisplay.textContent = "You scored a point!";
  } else {
    computerScore += 1;
    resultDisplay.textContent = "Computer scored a point!";
  }

  choicesDisplay.textContent = `You chose ${human}, computer chose ${computer}`;
  playerScoreDisplay.textContent = `Player: ${humanScore}`;
  computerScoreDisplay.textContent = `Computer: ${computerScore}`;

  if (humanScore === 5) {
    winner.textContent = `🎉 You have won the game! Click any button to restart.`;
    gameOver = true;
  } else if (computerScore === 5) {
    winner.textContent = `💻 Computer has won the game! Click any button to restart.`;
    gameOver = true;
  }
}



// Event listeners
rockButton.addEventListener("click", () => {
  if (gameOver) {
    resetGame(); // If game is over, reset first
  } else {
    playRound("rock", getComputerChoice());
  }
});

paperButton.addEventListener("click", () => {
  if (gameOver) {
    resetGame();
  } else {
    playRound("paper", getComputerChoice());
  }
});

scissorsButton.addEventListener("click", () => {
  if (gameOver) {
    resetGame();
  } else {
    playRound("scissors", getComputerChoice());
  }
});


function resetGame() {
  humanScore = 0;
  computerScore = 0;
  gameOver = false;

  playerScoreDisplay.textContent = "Player: 0";
  computerScoreDisplay.textContent = "Computer: 0";
  resultDisplay.textContent = "";
  choicesDisplay.textContent = "";
  winner.textContent = "";
}

