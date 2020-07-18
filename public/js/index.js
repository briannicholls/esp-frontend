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
