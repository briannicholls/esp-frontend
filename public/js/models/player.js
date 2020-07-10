class Player {
  static all = []

  constructor(data) {
    this.id = data.id
    this.username = data.username
    this.save()
  }

  update() {
    const configObject = {
      fetch(`${API.baseUrl}/players`)
    }
  }


}
