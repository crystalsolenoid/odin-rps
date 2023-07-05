function getComputerChoice() {
  switch (Math.floor(Math.random() * 3)) {
    case 0:
      return 'rock';
    case 1:
      return 'paper';
    case 2:
      return 'scissors';
  }
}

// utility function that capitalizes only the first letter of a string,
// making the rest lowercase
let capitalize = s => s.slice(0,1).toUpperCase() + s.slice(1).toLowerCase();

function handleChoice(event) {
  let playerChoice = this.getAttribute('id');
  playRound(playerChoice);
}

function playRound(playerChoice) {
  let computerChoice = getComputerChoice();
  let gameResult = evaluateRound(playerChoice, computerChoice);
  reportRound(gameResult, playerChoice, computerChoice);
}

function evaluateRound(playerSelection, computerSelection) {
  // handle ties first because they're easy.
  if (playerSelection === computerSelection) {
    return 'tie';
  }
  // to handle the rest, first identify if the player wins or loses,
  // then remember and build the message from that.
  let result;
  // just smoosh the strings together to handle them with a switch instead of nested ifs
  switch (playerSelection + computerSelection) {
    case 'rockpaper':
    case 'paperscissors':
    case 'scissorsrock':
      return 'loss';
    case 'paperrock':
    case 'scissorspaper':
    case 'rockscissors':
      return 'win';
  }
}

function updateScoreboard(scores) {
  scoreDisplays.player.textContent = scores.player;
  scoreDisplays.computer.textContent = scores.computer;
}

function reportRound(result, playerSelection, computerSelection) { 
  let roundMessage = '';
  switch (result) {
    case 'win':
      roundMessage = `You win! ${capitalize(playerSelection)} beats ${computerSelection}.`;
      scores.player += 1;
      break;
    case 'loss':
      roundMessage = `You lose! ${capitalize(computerSelection)} beats ${playerSelection}.`;
      scores.computer += 1;
      break;
    case 'tie':
      roundMessage = `It's a tie! Both ${playerSelection}.`;
      break;
    default:
      roundMessage = 'Something went wrong...';
  }
  messageWindow.textContent = roundMessage;
  updateScoreboard(scores);
  checkGameOver(scores);
}

function checkGameOver(scores) {
  if (scores.player >= maxRounds || scores.computer >= maxRounds) gameOver(scores.player > scores.computer);
}

function gameOver(won) {
  messageWindow.textContent = `You ${won? 'won' : 'lost'} the game${won? '!':'...'}`;
  resetButton.hidden = false;
}

let scores;
function resetGame() {
  messageWindow.textContent = 'Choose a move to get started.';
  scores = {player: 0, computer: 0};
  updateScoreboard(scores);
  resetButton.hidden = true;
}

const maxRounds = 5;

const messageWindow = document.querySelector('#gameMessage');
const playerScore = document.querySelector('#playerScore');
const computerScore = document.querySelector('#computerScore');
scoreDisplays = {player: playerScore, computer: computerScore};

const rockButton = document.querySelector('#rock');
const scissorsButton = document.querySelector('#scissors');
const paperButton = document.querySelector('#paper');
choiceButtons = [rockButton, scissorsButton, paperButton];

const resetButton = document.querySelector('#reset');

choiceButtons.forEach(btn => btn.addEventListener('click', handleChoice));
resetButton.addEventListener('click', resetGame);

resetGame();
