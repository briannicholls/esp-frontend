class Game {

  static all = []

  static findByTitle(title) {
    return fetch(`${API.baseUrl}/games/2`)
      .then(resp => console.log(resp))
      .then(gameObj => gameObj.body)
  }


  constructor(data) {
    this.speed = data.speed
    this.name = data.name
    this.id = data.id
    this.loadAudioAssets()
    this.save()
  }

  save() {
    Game.all.push(this)
  }

  loadAudioAssets() {
    const audioContainer = document.getElementById('audio-container')

    // get all assets needed for game
    fetch(`${API.baseUrl}/games/${this.id}/assets`)
      .then(resp => resp.json())
      .then(obj => {
        obj.forEach((assetData) => {
          const a = new Asset(assetData)
          a.addToDOM(audioContainer)
        });
      })
  }
}
