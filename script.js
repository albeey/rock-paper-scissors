const TOTAL_ROUNDS = 5;
let currentRound = 0

let playerScore = 0;
let computerScore = 0;

const optionButtons = document.querySelectorAll(".option");
optionButtons.forEach(button => {
  button.addEventListener("click", game);
});

function game() {
    updateRound();

    const userChoice = this.getAttribute("name");
    const roundResult = playRound(userChoice, computerPlay());
    updateResults(roundResult)

    const roundWinner = getRoundWinner(roundResult);
    updateScores(roundWinner);

    if (currentRound === TOTAL_ROUNDS) console.log(gameOver(playerScore, computerScore));
}

function updateRound() {
  currentRound++;
  const container = document.querySelector("#round-counter");
  container.textContent = `Round ${currentRound}/5`
}

function updateResults(roundResult) {
  const container = document.querySelector("#round-results");
  container.textContent = roundResult;
}

function computerPlay() {
  const options = ["Rock", "Paper", "Scissors"];
  return options[Math.floor(Math.random() * options.length)];
}

function playRound(playerSelection, computerSelection) {
  let playerChoice = playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase();

  if (playerChoice === computerSelection) {
    return "It's a tie!";
  } else if ((playerChoice === "Rock" && computerSelection !== "Paper") || (playerChoice === "Paper" && computerSelection !== "Scissors") || (playerChoice === "Scissors" && computerSelection !== "Rock")) {
    return `You win!`;
  }

  return `You Lose!`;
}

function getRoundWinner(resultString) {
  resultString = resultString.toLowerCase();

  if (resultString.includes("win")) {
    return "player"
  } else if (resultString.includes("lose")) {
    return "computer"
  }
}

function updateScores(roundWinner){
  if (roundWinner === "player") playerScore++;
  if (roundWinner === "computer") computerScore++;

  const player = document.querySelector("#player-score");
  const computer = document.querySelector("#computer-score");

  player.textContent = playerScore;
  computer.textContent = computerScore;
}

function gameOver(playerScore, computerScore) {
  if (playerScore > computerScore) {
    return "YOU WIN!"
  } else if (computerScore > playerScore) {
    return "YOU LOSE"
  } else {
    return "IT'S A TIE"
  }
}