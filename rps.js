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

function reportRound(result, playerSelection, computerSelection) { 
  let roundMessage = '';
  switch (result) {
    case 'win':
      roundMessage = `You win! ${capitalize(playerSelection)} beats ${computerSelection}.`;
      break;
    case 'loss':
      roundMessage = `You lose! ${capitalize(computerSelection)} beats ${playerSelection}.`;
      break;
    case 'tie':
      roundMessage = `It's a tie! Both ${playerSelection}.`;
      break;
    default:
      roundMessage = 'Something went wrong...';
  }
  messageWindow.textContent = roundMessage;
}

function game() {
}

const messageWindow = document.querySelector('#gameMessage');

const rockButton = document.querySelector('#rock');
const scissorsButton = document.querySelector('#scissors');
const paperButton = document.querySelector('#paper');
choiceButtons = [rockButton, scissorsButton, paperButton];

choiceButtons.forEach(btn => btn.addEventListener('click', handleChoice));

function handleChoice(event) {
  let playerChoice = this.getAttribute('id');
  playRound(playerChoice);
}
