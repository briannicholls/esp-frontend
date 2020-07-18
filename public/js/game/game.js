// Game Loop
function startGame() {
  beginNewTurn()
}

// Start a new Turn
function beginNewTurn() {
  // get a new image from the API!
  fetch('https://picsum.photos/700')
  .then(resp => resp.url)
  .then(url => {
    // Once we have a new image, hide the old image
    hideImageModal()
    new Turn({image_url: url})
    // reset highlighted square
    removeHighlightFromButton()
    addImageToDOM(url)
    // Allow User to now choose a square
    addGameButtonListeners()
    console.log('Turn has started!')
  })
}

// Add event listeners to Game-relevant Buttons
function addGameButtonListeners(trial) {
  getGameButtons().forEach((button, i) => {
    button.addEventListener('click', handleClick)
  });
}

// Remove event listeners from Game-relevant Buttons
function removeGameButtonListeners() {
  getGameButtons().forEach((button, i) => {
    button.removeEventListener('click', handleClick)
  });
}

// Submits the clicked element's id as the user's choice
function handleClick(e) {
  removeGameButtonListeners()
  const userChoice = e.target.id
  submitChoice(userChoice)
}

function submitChoice(choice) {
  const turn = currentTurn()

  // assign user's choice to this Turn
  turn.user_choice = choice

  // Was user correct, incorrect, or did user choose to pass?
  if (turn.user_choice === `${turn.computer_choice}`) {
    userChoseCorrectly(turn)
  } else if (choice == 'pass') {
    userPassed()
  } else {
    userChoseIncorrectly(turn)
  }
}

function currentTurn() {
  return Turn.all[Turn.all.length - 1]
}

function userChoseCorrectly(turn) {
  toggleImageModal()
  getCorrectSound().play()
  incrementTurnCounter()
  continueGame(4400)
}

function userChoseIncorrectly(turn) {
  addHighlightToButton(turn.computer_choice)
  getIncorrectSound().play()
  incrementTurnCounter()
  continueGame(1300)
}

function userPassed() {
  addHighlightToButton(turn.computer_choice)
  continueGame(1300)
}

// Dictates Turn length
function continueGame(delay) {
  setTimeout(() => {
    if (gameIsOver()) {
      return gameOver()
    } else {
      beginNewTurn()
    }
  }, delay)
}

// Returns Boolean, if HTML counter has reached 24
function gameIsOver() {
  const totalChoicesMadeByUser = parseInt(getTurnCounter().innerText)
  return totalChoicesMadeByUser >= 24 ? true : false
}

function gameOver() {
  console.log("Game Over")
  hideImageModal()
  removeHighlightFromButton()
  removeGameButtonListeners()
  displayScore()
}
