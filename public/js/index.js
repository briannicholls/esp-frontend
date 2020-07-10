const API = {
  baseUrl: 'http://localhost:3000'//'https://brians-brain-games.herokuapp.com'
}



//const COOKIE = document.cookie
//"username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/"

document.addEventListener('DOMContentLoaded', () => {
  applyModal()
  addStartGameButton()
})

// fetch game assets and add to DOM


// Game Loop
function startGameLoop() {
  const trial = createTrial()

      // get the active element (grid cell)
      //const activeElement = document.querySelector('.active')

    // save choice to turn based on ID of active element

  // begin game loop

}

function mainLoop() {

  resetTurnCounter()

  const cells = document.getElementsByClassName('grid__item')
  let turns = Turn.all

  turns.forEach((turn, i) => {
    setTimeout(function() {
      takeTurn(turn, cells, i)
    }, GAME_SPEED * i )
  })
}

function takeTurn(turnObject, gridCells) {
  const turnNum = incrementTurnCounter()

  // turn actions: display grid element, play sound
  // display grid cell:
  toggleDisplay(gridCells[turnObject.grid_position], turnObject.id)

  // for debugging:
  // if (turnObject.trueMatch(1, 'grid_position')) {
  //   console.log('pick me! grid match!')
  // }
  // if (turnObject.trueMatch(1, 'asset_id')) {
  //   console.log('pick me! audio match!')
  // }

  // play audio:
  const audioElement = document.getElementById(`audio-${turnObject.asset_id}`)
  audioElement.play()
  // this fixes overlapping audio bug when the same audio occurs
  // twice in a row
  setTimeout(function(){
    audioElement.load()
  }, 2000)

  // end game on the last turn
  if (turnNum === 24) {
    setTimeout(function() {
      endGame()
    }, GAME_SPEED)
  }
}

function endGame() {

  // Display results to user
  displayScoreModal()

  // re-enable start game button
  document.getElementById('start_game').disabled = false


  Trial.all[0].update()
//  Turn.all = []
//  Trial.all = []
}

function displayScoreModal() {
  const score = Trial.all[0].calculateScore()
  Trial.all[0].score = score
  const scoreModal = document.getElementById('score-modal')
  const scoreDisplay = document.getElementById('score-display')
  scoreDisplay.innerText = `${score}%`
  scoreModal.style.display = 'block'
  let span = document.getElementsByClassName("close")[1];

  span.onclick = function() {
    scoreModal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == scoreModal) {
      scoreModal.style.display = "none";
    }
  }
  // increase level if score is high enough
  const startGameButton = document.getElementById('start_game')
  if (score > 80) {
    startGameButton.innerText = 'Next Level!'
    startGameButton.classList.add('w3-green')
    increaseLevel()
  } else if (score < 40) {
    decrementLevel()
    //startGameButton.disabled = true
    startGameButton.innerText = 'Try Again'
  } else {
    startGameButton.innerText = 'Try Again'
  }
}

function increaseLevel() {
  const e = document.getElementById('n_number')
  const old = e.innerText
  if (old === 'n') {
    e.innerText = 1
  } else {
    e.innerText = parseInt(old) + 1
    Trial.all[0].n_number = parseInt(old) + 1
  }
}

function incrementTurnCounter() {
  const counter = document.querySelector('#turn-counter')
  counter.innerText = parseInt(counter.innerText) + 1
  return parseInt(counter.innerText)
}

function resetTurnCounter() {
  document.querySelector('#turn-counter').innerText = 0
}

// highlight a grid element temporarily
function toggleDisplay(element, turnId) {
  element.classList.add('active')
  element.classList.add(`turn_id_${turnId}`)
  element.setAttribute('id', turnId)
  // console.log('display ' + element.id)
  setTimeout(function() {
    element.setAttribute('id', '')
    element.classList.remove('active')
    element.classList.remove(`turn_id_${turnId}`)
  }, 3100)
}

// POST new Trial, populate turns
async function createTrial() {
  const configObject = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({game_id: 2 , max_turns: 24})
  }
  let response = await fetch(`${API.baseUrl}/trials`, configObject)
  let trial = await response.json()
  const newTrial = new Trial(trial)
  return newTrial
}

async function loadTurns(trialId) {
  let response = await fetch(`${API.baseUrl}/trials/${trialId}/turns`)
  let turns = await response.json()
  let turnObjects = []
  for (let i = 0; i < turns.length; i++) {
    const t = new Turn(turns[i])
    turnObjects.push(t)
  }
  return turnObjects
}

// Add the modal
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

function pressButtonAnimation(button) {
  button.classList.add('w3-black')
  setTimeout(function() {
    button.classList.remove('w3-black')
  }, 100)
}

// add function to start game button
function addStartGameButton() {
  const btn = document.getElementById('start_game')
  btn.addEventListener('click', (e) => {
    btn.classList.remove('w3-green')
    document.getElementById('score-display').innerText = ''
    let n = document.getElementById('n_number')
    if (n.innerText === 'n') {
      n.innerText = 1
      startGameLoop(1)
    } else {
      startGameLoop(parseInt(n.innerText))
    }
    btn.disabled = true
  })
}
