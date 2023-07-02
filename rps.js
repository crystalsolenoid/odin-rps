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

function playRound(playerSelection, computerSelection) {
  // clean player input. should be refactored later.
  playerSelection = playerSelection.toLowerCase();
  // handle ties first because they're easy.
  if (playerSelection === computerSelection) {
    return `It's a tie! Both ${playerSelection}.`;
  }
  // to handle the rest, first identify if the player wins or loses,
  // then remember and build the message from that.
  let result;
  // just smoosh the strings together to handle them with a switch instead of nested ifs
  switch (playerSelection + computerSelection) {
    case 'rockpaper':
    case 'paperscissors':
    case 'scissorsrock':
      result = 'loss';
      break;
    case 'paperrock':
    case 'scissorspaper':
    case 'rockscissors':
      result = 'win';
      break;
  }
  // knowing who chose what an if it's a loss or win, we can now build the messages
  if (result === 'loss') {
    return `You lose! ${capitalize(computerSelection)} beats ${playerSelection}.`;
  } else {
    return `You win! ${capitalize(playerSelection)} beats ${computerSelection}.`;
  }
}

function getPlayerChoice() {
  let validInput = false;
  let playerInput = prompt('Rock, paper, or scissors? Which do you choose?');
  for (let i = 0; i < 5; i++) {
    switch (playerInput.toLowerCase()) {
      case 'rock':
      case 'paper':
      case 'scissors':
        return playerInput;
      case 'exit':
        return 'fail';
      default:
        playerInput = prompt('Please try again.\nTo exit, type "exit".\nRock, paper, or scissors? Which do you choose?');
    }
  }
  console.log('Too many invalid inputs. Game over.');
  return 'fail';
}

function game() {
  let playerChoice;
  let computerChoice;
  for (let i = 0; i < 5; i++) {
    playerChoice = getPlayerChoice();
    computerChoice = getComputerChoice();
    if (playerChoice == 'fail') break;
    let gameResult = playRound(playerChoice, computerChoice);
    console.log(gameResult);
  }
}
