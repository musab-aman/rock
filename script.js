
function getHumanchoice() {
    let userInput = prompt("Enter r for rock, p for paper, or s for scissors");

let userChoice;
if (userInput === 'r') {
  userChoice = "rock";
} else if (userInput === 'p') {
  userChoice = "paper";
} else if (userInput === 's') {
  userChoice = "scissors";
} 
console.log(userChoice);
}
getHumanchoice();





