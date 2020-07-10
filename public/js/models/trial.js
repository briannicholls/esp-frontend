class Trial {
  static all = []

  constructor(data) {

    this.id = data.id
    this.maxTurns = data.max_turns
    this.game_id = data.game_id
    this.player_id = data.player_id
    this.n_number = data.n_number
    this.score = 0
    this.save()
  }

  save() {
    Trial.all.push(this)
  }

  update() {
    const configObject = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify( {
        score: this.score,
        n_number: this.n_number
      })
    }

    return fetch(`${API.baseUrl}/trials/${this.id}`, configObject)
      .then(resp => resp)
      //.then(obj => obj)
      .then(console.log(`Trial ${this.id} updated`))
  }

  calculateScore() {

    let maxScorePossible = 0
    let totalScore = 0

    Turn.all.forEach((turn) => {
      // check to see if the attribute is a match
      if (turn.trueMatch(this.n_number, 'grid_position') === true) {
        // if so, log this as a possible correct choice. Also,
        maxScorePossible += 1
        // if user selected position match for this turn,
        if (turn.user_selected_position === true) {
          totalScore += 1 // log this as a correct user choice
        } else if (turn.user_selected_position === false) {
          //totalScore -= 0.5 // user did not select, and missed the choice
        }
      } else {
        // turn is not a trueMatch,
        if (turn.user_selected_position === true) {
          // but player thought it was :( 0.5 POINTS FROM GRYFFINDOR!!!
          //totalScore -= 0.5
        }
      }

      //same for audio match
      if (turn.trueMatch(this.n_number, 'asset_id') === true) {
        maxScorePossible += 1
        if (turn.user_selected_audio === true) {
          totalScore += 1
        } else if (turn.user_selected_audio === false) {
          //totalScore -= 0.5
        }
      } else {
        if (turn.user_selected_position === true) {
          //totalScore -= 0.5
        }
      }

    });

    console.log(`possible correct answers: ${maxScorePossible}`)
    console.log(`correct answers: ${totalScore}`)

    this.score = Math.round((totalScore / maxScorePossible) * 100)
    return this.score
  }
}
