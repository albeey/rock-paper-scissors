// Rock, Paper, Scissors selectors
const rockBtn = document.querySelector("#rock");
const paperBtn = document.querySelector("#paper");
const scissorsBtn = document.querySelector("#scissors");

// Score Board
let roundCount = 0;
let computerScore = 0;
let playerScore = 0;

// After 5 rounds it will display the final score
function checkNumOfRounds() {
  if (roundCount >= 5) {
    gameOver();
  }
}

// Score board selectors
const rounds = document.querySelector("#round-count");
const userScore = document.querySelector("#user-score");
const compScore = document.querySelector("#comp-score");
const roundDetails = document.querySelector("#round-detail");

// Updates scoreBoard
function scoreBoard() {
  rounds.textContent = `Round ${roundCount}/5`;
  userScore.textContent = playerScore;
  compScore.textContent = computerScore;
}

// computer choice div is hidden until round 1 starts
const computersChoice = document.querySelector("#computers-choice");
computersChoice.style.visibility = "hidden";

// Updates computer selection img according to computerSelection
function updateComputersChoice(compChoice) {
  const computersChoiceImage = document.querySelector("#c-img");
  if (compChoice === "Rock") {
    computersChoiceImage.src = "/images/fist-emoji.png";
  } else if (compChoice === "Paper") {
    computersChoiceImage.src = "/images/hand-emoji.png";
  } else {
    computersChoiceImage.src = "/images/victory-emoji.png";
  }
}

// Its called right after opening hmtl file to update the score board
scoreBoard();

// Shows round winner, updates score and runs checkNumOfRounds 
// to ensure there's only 5 rounds
function displayResults(textToDisplay) {
  roundDetails.textContent = textToDisplay;
  scoreBoard();
  checkNumOfRounds();
}

// Game over selectors
const gameOverOverlay = document.querySelector("#game-over");
const resultMessage = document.querySelector("#result-message");
const result = document.querySelector("#result");
const score = document.querySelector("#score");
const playAgain = document.querySelector("#play-again")

// Game over 
function gameOver() {
  gameOverOverlay.style.display = "block";

  if (playerScore < computerScore) {
    resultMessage.textContent = "Great Job!";
    result.textContent = "You won";
  } else {
    resultMessage.textContent = "Better Luck Next Time!";
    result.textContent = "You lost";
  }
  score.textContent = `Player ${playerScore} — Computer: ${computerScore}`;
}

// Play Again
playAgain.addEventListener("click", () => window.location.reload());

// Gets ID of the button pressed (rock/paper/scissors) and runs playRound function 
// using the ID as the playerSelection parameter
function returnPlayerChoice(e) {
  const playerChoiceByBtnId = e.id;
  return playRound(playerChoiceByBtnId);
}

// Rock, Paper, Scissors onclick event, runs returnPlayerChoice function
rockBtn.onclick = function() {
  returnPlayerChoice(this);
};

paperBtn.onclick = function() {
  returnPlayerChoice(this);
};

scissorsBtn.onclick = function() {
  returnPlayerChoice(this);
};

// Computer Choice
function computerPlay() {
  const rockPaperScissors = ["Rock", "Paper", "Scissors"];
  const randomChoice = rockPaperScissors[Math.floor(Math.random() * 3)];
  return randomChoice;
}

// One round
function playRound (playerSelection, computerSelection = computerPlay()) {
  playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase();
  // Updates computersChoice div according to computerSelection property
  updateComputersChoice(computerSelection);
  // computers choice div is visible when round 1 starts
  computersChoice.style.visibility = "visible";
  // roundResults holds the text that is going to be displayed
  let roundResult;
  if (playerSelection === computerSelection) {
      roundResult = "Tie! Try again";
      displayResults(roundResult);
  } else if ((playerSelection === "Rock" && computerSelection === "Scissors") ||
        (playerSelection === "Paper" && computerSelection === "Rock") ||
        (playerSelection === "Scissors" && computerSelection === "Paper")) {
      roundCount++;
      roundResult = `You Win! ${playerSelection} beats ${computerSelection}`;
      playerScore++;
      displayResults(roundResult);
  } else {
      roundCount++;
      roundResult = `You Lose! ${computerSelection} beats ${playerSelection}`;
      computerScore++;
      displayResults(roundResult);
  }
}
