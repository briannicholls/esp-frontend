class Turn {
  static all = []

  constructor(data) {
    this.id = data.id
    this.trial_id = data.trial_id
    this.player_id = data.player_id
    this.grid_position = data.grid_position
    this.asset_id = data.asset_id
    this.user_selected_position = data.user_selected_position
    this.user_selected_audio = data.user_selected_audio
    this.save()
  }

  save() {
    Turn.all.push(this)
  }

  // PATCH request to server
  update() {
    const configObject = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        correct_audio_guess: this.correct_audio_guess,
        correct_position_guess: this.correct_position_guess,
        user_selected_audio: this.user_selected_audio,
        user_selected_position: this.user_selected_position
      })
    }
    fetch(`${API.baseUrl}/turns/${this.id}`, configObject)
      .then(resp => resp.json())
      .then(obj => console.log(`turn ${this.id} updated (${obj.id})`))
  }

  // return true or false depending on attribute match with given n_number
  trueMatch(n_number, attributeString) {
    const turnToCompare = this.nBack(n_number)
    if (turnToCompare[`${attributeString}`] === this[`${attributeString}`]) {
      return true
    } else {
      return false
    }
  }

  // returns Turn n-Back from self
  // or false if from different trial / not found
  nBack(n_number) {
    const q = Turn.all.find(turn => turn.id === this.id - n_number)
    // make sure it's in the same trial
    if (q && q.trial_id === this.trial_id) {
      return q
    } else {
      return false
    }
  }

}
