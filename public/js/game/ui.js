function toggleImageModal() {
  const modal = getImageModal()
  if (modal.style.display == 'block') {
    modal.style.display = 'none'
  } else {
    modal.style.display = 'block'
  }
}

function showImageModal() {
  const modal = getImageModal()
  if (modal.style.display == 'none') {
    modal.style.display = 'block'
  }
}

function hideImageModal() {
  const modal = getImageModal()
  if (modal.style.display == 'block') {
    modal.style.display = 'none'
  }
}

// HTML Element Get functions
function getImageModal() {  return document.getElementById('image-modal');  }
function getCorrectSound() {  return document.getElementById('correct-sound');  }
function getIncorrectSound() {  return document.getElementById('incorrect-sound');  }
function getGameButtons() {  return document.querySelectorAll('.game-button');  }

// Highlight the button with input id to User
function addHighlightToButton(id) {
  const element = document.getElementById(id)
  element.classList.add('w3-white')
}

// Find and remove highlight from the highlighted button
function removeHighlightFromButton() {
    const btn = document.getElementsByClassName('w3-white')[0]
    !!btn ? btn.classList.remove('w3-white') : null
}

function displayScore() {
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
  document.getElementById('score-modal').style.display = 'block'
  document.getElementById('score-display').innerText = `You scored ${result.correct} out of 24 (${Math.round((result.correct / 24) * 100)}%)`
}

function addImageToDOM(url) {
  const imageElement = document.getElementById('image-display')
  imageElement.setAttribute('src', url)
  imageElement.setAttribute('alt', 'description')
}

function incrementTurnCounter() {
  const counter = document.querySelector('#turn-counter')
  counter.innerText = parseInt(counter.innerText) + 1
  return parseInt(counter.innerText)
}

function resetTurnCounter() {
  document.querySelector('#turn-counter').innerText = 0
}
