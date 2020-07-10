class Asset {
  constructor(data) {
    this.id = data.id
    this.file_path = data.file_path
    this.name = data.name
    this.save()
  }

  static all = []

  save() {
    Asset.all.push(this)
  }

  addToDOM(containerElement) {
    const a = document.createElement('AUDIO')
    a.setAttribute('src', this.file_path)
    a.setAttribute('type', 'audio/ogg')
    a.setAttribute('id', `audio-${this.id}`)
    a.preload = 'auto'
    containerElement.appendChild(a)
  }
}
