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

function computeResult(resultString) {
  if (resultString.includes("win")) {
    return "player"
  } else if (resultString.includes("lose")) {
    return "computer"
  } else {
    return "tie"
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

// function game() {
//   let playerScore = 0;
//   let computerScore = 0;

//   for (let index = 0; index < 5; index++) {
//     console.log(`ROUND: ${index + 1}`)

//     const playerSelection = prompt("Player's choice: ");
//     const computerSelection = computerPlay();

//     const result = playRound(playerSelection, computerSelection);
//     console.log(result);

//     const roundWinner = computeResult(result);

//     if (roundWinner === "player") {
//       playerScore++;
//     } else if (roundWinner === "computer") {
//       computerScore++;
//     }
//   }

//   const winner = getWinner(playerScore, computerScore);
//   console.log(winner);
//   console.log(`Player: ${playerScore} - Computer: ${computerScore}`);
// }

// game()

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

function game(choice, roundNumber) {
  const userChoice = choice.textContent;
  const round = playRound(userChoice, computerPlay());

  updateResults(round);
}

const TOTAL_ROUNDS = 5;
let roundNumber = 0;

const optionButtons = document.querySelectorAll(".option");

optionButtons.forEach(button => {
  button.addEventListener("click", () => {
    roundNumber++;
    updateRound(roundNumber);
    game(button, roundNumber);
  });
});