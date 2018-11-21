let score = {
  player: 0,
  AI: 0
}

handleGameUpdate = side => {
  let chooseSide = Math.floor(Math.random() * 2)
  if ((side === 0 && chooseSide === 0) || (side === 1 && chooseSide === 1)) {
    score.player += 1
    document.getElementById('game-output').innerHTML = `Point for you!`
  }
  if ((side === 0 && chooseSide === 1) || (side === 1 && chooseSide === 0)) {
    score.AI += 1
    document.getElementById('game-output').innerHTML = `Point for me!`
  }
  document.getElementById('score').innerHTML = `Player ${score.player} : ${score.AI} AI`
}

console.log(`Heads&Tails game made by falbor45 (https://github.com/falbor45)`)
document.getElementById('heads').onclick = () => handleGameUpdate(0)
document.getElementById('tails').onclick = () => handleGameUpdate(1)