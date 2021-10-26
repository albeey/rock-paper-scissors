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
    const computerChoice = computerPlay();
    const roundResult = playRound(userChoice, computerChoice);
    displayComputerChoice(computerChoice)

    updateResults(roundResult)

    const roundWinner = getRoundWinner(roundResult);
    updateScores(roundWinner);

    if (currentRound === TOTAL_ROUNDS) gameOver();
}

function displayComputerChoice(computerChoice) {
  const container = document.querySelector("#computer-choice");
  container.innerHTML = "";

  // <p> element
  const pElement = document.createElement("p")
  pElement.textContent = "Computer: ";
  container.appendChild(pElement);

  // <img>
  const imgElement = document.createElement("img");
  imgElement.classList.add("computer-play-img")
  imgElement.src = `images/${computerChoice.toLowerCase()}.png`
  imgElement.alt = `computer chose ${computerChoice}`;
  container.appendChild(imgElement);
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

function gameOver() {
  // Show modal
  const modal = document.querySelector("#modal");
  modal.style.display = "block";

  const modalContent = document.querySelector(".modal-content");

  const message = document.createElement("p");
  const result = document.createElement("p");
  const score = document.createElement("p");

  message.classList.add("message");
  result.classList.add("result");
  score.classList.add("final-score");

  // Get winner
  if (playerScore > computerScore) {
    message.textContent = "Congratulations!";
    result.textContent = "You won!";
  } else if (computerScore > playerScore) {
    message.textContent = "Better luck next time!";
    result.textContent = "You lost";
  } else {
    message.textContent = "Try again!";
    result.textContent = "It's a tie";
  }
  score.textContent = `Player: ${playerScore} - Computer: ${computerScore}`;

  const playAgain = document.createElement("button");
  playAgain.textContent = "Play Again";
  playAgain.classList.add("play-again");

  playAgain.addEventListener("click", () => {
    location.reload();
  });

  [message, result, score, playAgain].forEach(ele => modalContent.appendChild(ele));
}
