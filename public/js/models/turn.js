class Turn {
  constructor(data) {
    this.computer_choice = Math.ceil(Math.random() * 4),
    this.user_choice = ''
    this.image_url = data.image_url
  }

  save(trial) {
    trial.turns.push(this)
  }
}
