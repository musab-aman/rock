function getHumanChoice() {

  let userChoice;
  if (userInput === 'r') {
    userChoice = "rock";
  } else if (userInput === 'p') {
    userChoice = "paper";
  } else if (userInput === 's') {
    userChoice = "scissors";
  } 

  console.log("Your choice: " + userChoice);
  return userChoice;
}

function getComputerChoice() {
  let randomNum = Math.floor(Math.random() * 3);
  let computerChoice;

  if (randomNum === 0) {
    computerChoice = "rock";
  } else if (randomNum === 1) {
    computerChoice = "paper";
  } else {
    computerChoice = "scissors";
  }

  console.log("Computer choice: " + computerChoice);
  return computerChoice;
}

let humanScore = 0;
let computerScore = 0;

function playRound(human, computer) {

  if (human === computer) {
    console.log("It's a tie!");
  } else if (
    (human === "rock" && computer === "scissors") ||
    (human === "paper" && computer === "rock") ||
    (human === "scissors" && computer === "paper")
  ) {
    humanScore += 1;
    console.log("You score!");
  } else {
    computerScore += 1;
    console.log("Computer scores!");
  }

  console.log(`Score — You: ${humanScore}, Computer: ${computerScore}`);

  if (humanScore === 3) {
    console.log("You've won the game!");
  }

  if (computerScore === 3) {
    console.log("You've lost the game!");
  }
}

function playGame() {
  while (humanScore < 3 && computerScore < 3) {
    const human = getHumanChoice();
    const computer = getComputerChoice();
    playRound(human, computer);
  }
}


// Remove playGame(); for UI-based play

const rockButton = document.querySelector(".rock-btn");
const paperButton = document.querySelector(".paper-btn");
const scissorsButton = document.querySelector(".scissors-btn");

rockButton.addEventListener("click", () => alert("rock"));
paperButton.addEventListener("click", () => alert("paper"));
scissorsButton.addEventListener("click", () => alert("scissors"));
