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

function applyScoreModal() {
  let modal = document.getElementById("score-modal");
  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName("close")[1];
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

function applyModals() {applyModal(); applyScoreModal();}

// add onClick action to Start Game button
function addStartGameListener() {
  const button = document.getElementById('start_game')
  button.addEventListener('click', () => {
    button.disabled = true
    startGame()
  })
}

document.addEventListener('DOMContentLoaded', () => {
  applyModals()
  addStartGameListener()
})
//
// function handleClick(e) {
//   const userChoice = e.target.id
//   submitChoice(userChoice)
//   removeGameButtonListeners()
// }
//
// function getGameButtons() {
//   return document.querySelectorAll('.game-button')
// }
//
// function addGameButtonListeners(trial) {
//   getGameButtons().forEach((button, i) => {
//     button.addEventListener('click', handleClick)
//   });
// }
//
// function removeGameButtonListeners() {
//   getGameButtons().forEach((button, i) => {
//     button.removeEventListener('click', handleClick)
//   });
// }
//
// function submitChoice(choice) {
//   const turn = Turn.all[Turn.all.length - 1]
//   turn.user_choice = choice
//
//   if (turn.user_choice === `${turn.computer_choice}`) {
//     console.log("correct!")
//     // show image modal
//     toggleImageModal()
//     // play "correct" sound
//     getCorrectSound().play()
//     incrementTurnCounter()
//     continueGame(4600)
//   } else if (choice == 'pass') {
//     console.log('user passed')
//     highlightButton(turn.computer_choice)
//     continueGame(1500)
//   } else {
//     console.log('incorrect!')
//     // highlight correct choice
//     highlightButton(turn.computer_choice)
//     // play "incorrect" sound
//     getIncorrectSound().play()
//     incrementTurnCounter()
//     continueGame(1500)
//   }
// }
//
// function continueGame(delay) {
//   setTimeout(() => {
//     if (gameIsOver()) {
//       return gameOver()
//     } else {
//       beginNewTurn()
//     }
//   }, delay)
// }
//
// function highlightButton(id) {
//   const element = document.getElementById(id)
//   element.classList.add('w3-white')
// }
//
// function getButton(id) {
//   return document.getElementById(id)
// }
//
// function toggleImageModal() {
//   const modal = getImageModal()
//   if (modal.style.display == 'block') {
//     modal.style.display = 'none'
//   } else {
//     modal.style.display = 'block'
//   }
// }
//
// function showImageModal() {
//   const modal = getImageModal()
//   if (modal.style.display == 'none') {
//     modal.style.display = 'block'
//   }
// }
//
// function hideImageModal() {
//   const modal = getImageModal()
//   if (modal.style.display == 'block') {
//     modal.style.display = 'none'
//   }
// }
//
// function gameIsOver() {
//   const totalChoicesMadeByUser = parseInt(document.getElementById('turn-counter').innerText)
//   return totalChoicesMadeByUser >= 24 ? true : false
// }
//
// function getCorrectSound() {
//   return document.getElementById('correct-sound')
// }
//
// function getIncorrectSound() {
//   return document.getElementById('incorrect-sound')
// }
//
// // Game Loop
// function startGame() {
//   addGameButtonListeners()
//   beginNewTurn()
// }
//
// function beginNewTurn() {
//   // get image from API!
//   fetch('https://picsum.photos/700')
//     .then(resp => resp.url)
//     .then(url => {
//       new Turn({image_url: url})
//       hideImageModal()
//       // reset highlighted square
//       removeHighlightFromButton()
//       addImageToDOM(url)
//       console.log('added image to DOM')
//       // add click listeners back to btns
//       addGameButtonListeners()
//     })
// }
//
// function gameOver() {
//   console.log("Game Over")
//   hideImageModal()
//   removeHighlightFromButton()
//   removeGameButtonListeners()
//   resetTurnCounter()
//   displayScore()
// }
//
// function displayScore() {
//   const result = Turn.all.reduce((total, turn) => {
//     if (turn.user_choice == turn.computer_choice) {
//       total.correct += 1
//     } else if (turn.user_choice != 'pass'){
//       total.incorrect += 1
//     } else {
//     }
//     return total
//   }, {correct: 0, incorrect: 0})
//   console.log(result)
//   document.getElementById('score-modal').style.display = 'block'
//   document.getElementById('score-display').innerText = `You scored ${result.correct} out of 24 (${Math.round((result.correct / 24) * 100)}%)`
// }
//
// function removeHighlightFromButton() {
//   const btn = document.getElementsByClassName('w3-white')[0]
//   !!btn ? btn.classList.remove('w3-white') : null
// }
//
// function getImageModal() {
//   return document.getElementById('image-modal')
// }
//
// function addImageToDOM(url) {
//   const imageElement = document.getElementById('image-display')
//   imageElement.setAttribute('src', url)
//   imageElement.setAttribute('alt', 'description')
// }
//
// function incrementTurnCounter() {
//   const counter = document.querySelector('#turn-counter')
//   counter.innerText = parseInt(counter.innerText) + 1
//   return parseInt(counter.innerText)
// }
//
// function resetTurnCounter() {
//   document.querySelector('#turn-counter').innerText = 0
// }
