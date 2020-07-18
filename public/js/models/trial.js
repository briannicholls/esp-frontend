// class Trial {
//   constructor() {
//     this.score = 0
//     this.turns = []
//   }
//
//   submit() {
//     fetch(`${API}/trials`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*'
//       },
//       body: JSON.stringify({
//         score: this.score,
//         turns: this.turns
//       })
//     })
//     .then(resp => resp.json())
//     .then(json => {console.log(json)})
//   }
//
//   addTurn(turn) {
//     this.turns.push(turn)
//   }
// }
