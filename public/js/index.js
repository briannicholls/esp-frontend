const API = {
  baseUrl: 'http://localhost:3000'
}

document.addEventListener('DOMContentLoaded', () => {
  applyModal()
  addStartGameButton()
})

function addGameButtonListeners(trial) {
  gameButtons = document.querySelectorAll('.game-button')
  for (let i = 0; i < gameButtons.length; i++) {
    gameButtons[i].addEventListener('click', (e) => {
      e.stopPropagation()
      const userChoice = e.target.id
      submitChoice(userChoice, trial)
    })
  }
}

function submitChoice(choice, trial) {
  const turn = trial.turns[trial.turns.length - 1]
  turn.user_choice = choice
  
  if (turn.user_choice === `${turn.computer_choice}`) {
    console.log("correct!")
  } else if (choice == 'pass') {
    console.log('user passed')
  } else {
    console.log('incorrect!')
  }

  const totalChoicesMadeByUser = trial.turns.reduce((total, turn) => {
    if (turn.user_choice != 'pass') {
      return total += 1
    } else {
      return total
    }
  }, 0)

  if (totalChoicesMadeByUser < 24) {
    beginNewTurn(trial)
  } else {
    endGame(trial)
  }
}

function endGame(trial) {
  const result = trial.turns.reduce((total, turn) => {
    if (turn.user_choice == turn.computer_choice) {
      total.correct += 1
    } else if (turn.user_choice != 'pass'){
      total.incorrect += 1
    } else {

    }
    return total
  }, {correct: 0, incorrect: 0})
  console.log(result)
  // game is over, submit data to server
}

// Game Loop
function startGame(trial) {
  addGameButtonListeners(trial)
  beginNewTurn(trial)
}

function beginNewTurn(trial) {
  const url = 'https://previews.123rf.com/images/vitplus/vitplus1612/vitplus161200019/69533061-little-puppy-sleeping-sweet-on-soft-cozy-knitted-sweater-cute-dog-dreaming-retro-filtered.jpg'
  trial.addTurn(new Turn({image_url: url}))
  addImageToDOM(url)
}

function addImageToDOM(url) {
  const imageModal = document.getElementById('image-modal')
  imageModal.display = 'none'
  const imageElement = document.getElementById('image-display')
  imageElement.src = url
}

function incrementTurnCounter() {
  const counter = document.querySelector('#turn-counter')
  counter.innerText = parseInt(counter.innerText) + 1
  return parseInt(counter.innerText)
}

function resetTurnCounter() {
  document.querySelector('#turn-counter').innerText = 0
}

// Add the instructions modal
function applyModal() {
  let modal = document.getElementById("myModal");
  // Get the button that opens the modal
  let btn = document.getElementById("myBtn");
  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName("close")[0];
  // When the user clicks on the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  }
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

// add onClick action to Start Game button
function addStartGameButton() {
  const button = document.getElementById('start_game')
  button.addEventListener('click', () => {
    button.disabled = true
    const trial = new Trial
    startGame(trial)
  })
}
