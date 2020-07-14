const API = {
  baseUrl: 'http://localhost:3000'
}

document.addEventListener('DOMContentLoaded', () => {
  applyModals()
  addStartGameButton()
})

function handleClick(e) {
  const userChoice = e.target.id
  submitChoice(userChoice)
}

function getGameButtons() {
  return document.querySelectorAll('.game-button')
}

function addGameButtonListeners(trial) {
  getGameButtons().forEach((button, i) => {
    button.addEventListener('click', handleClick)
  });
}

function removeGameButtonListeners() {
  getGameButtons().forEach((button, i) => {
    button.removeEventListener('click', handleClick)
  });
}

function submitChoice(choice) {
  const turn = Turn.all[Turn.all.length - 1]
  turn.user_choice = choice

  if (turn.user_choice === `${turn.computer_choice}`) {
    console.log("correct!")
    // show image modal
    getImageModal().style.display = 'block'
    // play "correct" sound
  } else if (choice == 'pass') {
    console.log('user passed')
  } else {
    console.log('incorrect!')
    // play "incorrect" sound
  }

  const totalChoicesMadeByUser = Turn.all.reduce((total, turn) => {
    if (turn.user_choice != 'pass') {
      return total += 1
    } else {
      return total
    }
  }, 0)

  if (totalChoicesMadeByUser < 24) {
    beginNewTurn()
  } else {
    endGame()
  }
}

function endGame() {
  removeGameButtonListeners()

  const result = Turn.all.reduce((total, turn) => {
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
function startGame() {
  addGameButtonListeners()
  beginNewTurn()
}

function beginNewTurn() {
  const url = 'https://previews.123rf.com/images/vitplus/vitplus1612/vitplus161200019/69533061-little-puppy-sleeping-sweet-on-soft-cozy-knitted-sweater-cute-dog-dreaming-retro-filtered.jpg'
  new Turn({image_url: url})
  addImageToDOM(url)
}

function getImageModal() {
  return document.getElementById('image-modal')
}

function addImageToDOM(url) {
  getImageModal().style.display = 'none'
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
  let modal = document.getElementById("instructions-modal");
  // Get the button that opens the modal
  let btn = document.getElementById("view-instructions");
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

function applyImageModal() {
  let modal = document.getElementById("image-modal");
  let span = document.getElementsByClassName("close2")[0];
  span.onclick = () => { modal.style.display = "none" }
  window.onclick = event => {if (event.target == modal) {modal.style.display = "none"};};
}

function applyModals() {applyModal(); applyImageModal();}

// add onClick action to Start Game button
function addStartGameButton() {
  const button = document.getElementById('start_game')
  button.addEventListener('click', () => {
    button.disabled = true
    startGame()
  })
}
