function computerPlay() {
  const options = ["Rock", "Paper", "Scissors"];
  return options[Math.floor(Math.random() * options.length)];
}

function playRound(playerSelection, computerSelection) {
  let playerChoice = playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase();

  if (playerChoice === computerSelection) {
    return "It's a tie!";
  } else if ((playerChoice === "Rock" && computerSelection !== "Paper") || (playerChoice === "Paper" && computerSelection !== "Scissors") || (playerChoice === "Scissors" && computerSelection !== "Rock")) {
    return `You win! ${playerChoice} beats ${computerSelection}`;
  }

  return `You Lose! ${computerSelection} beats ${playerChoice}`;
}

function getRoundWinner(resultString) {
  resultString = resultString.toLowerCase();

  if (resultString.includes("win")) {
    return "player"
  } else if (resultString.includes("lose")) {
    return "computer"
  }
}

function getWinner(playerScore, computerScore) {
    if (playerScore > computerScore) {
    return "YOU WIN!"
  } else if (computerScore > playerScore) {
    return "YOU LOSE"
  } else {
    return "IT'S A TIE"
  }
}

function updateResults(roundResult) {
  const container = document.querySelector("#results");
  const result = document.createElement("p");

  if (container.innerText != "") container.innerText = "";

  result.textContent = roundResult;
  container.appendChild(result);
}

function updateRound(currentRound) {
  const container = document.querySelector("#round");
  container.textContent = `Round ${currentRound}/5`
}

function updateScores(playerScore, computerScore){
  const player = document.querySelector("#player-score");
  const computer = document.querySelector("#computer-score");

  player.textContent = `Player: ${playerScore}`;
  computer.textContent = `Computer: ${computerScore}`;
}

const TOTAL_ROUNDS = 5;
let currentRound = 0;

let playerScore = 0;
let computerScore = 0;

const optionButtons = document.querySelectorAll(".option");
optionButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentRound++;
    updateRound(currentRound);

    const userChoice = button.textContent;
    const roundResult = playRound(userChoice, computerPlay());
    updateResults(roundResult)

    const roundWinner = getRoundWinner(roundResult);
    
    // Update Score
    if (roundWinner === "player") playerScore++;
    if (roundWinner === "computer") computerScore++;
    updateScores(playerScore, computerScore);

    if (currentRound === TOTAL_ROUNDS) alert(getWinner(playerScore, computerScore));
  });
});