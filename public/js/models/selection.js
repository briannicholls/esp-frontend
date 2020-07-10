class Selection {
  static all = []

  constructor(timestamp, selectionType, turnId) {
    this.timestamp = timestamp
    this.selectionType = selectionType
    this.turnId = turnId
    this.save()
  }

  save() {
    Selection.all.push(this)
  }

  
}
