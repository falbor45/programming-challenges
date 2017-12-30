{
  console.log(`Rock, paper, scissors, lizard, Spock made by falbor45 (https://github.com/falbor45)`)
  let p1 = 0
  let p2 = 0
  let battle = (pChoice) => {
    let choices = {
      rock : {defeats: ["scissors","lizard"]},
      paper: {defeats: ["rock", "spock"]},
      scissors: {defeats: ["paper", "lizard"]},
      lizard: {defeats:["paper","spock"]},
      spock: {defeats:["scissors","rock"]}
    };
    let signs = ["rock", "paper", "scissors", "lizard", "spock"]
    let botChoice = signs[Math.floor(Math.random() * signs.length)]
    let playerChoice = choices[pChoice]
    let result = document.getElementById("result")
    let score = `${p1} : ${p2}`

    if (pChoice === botChoice) {
      result.innerHTML = "It's a tie!"
    }
    if (playerChoice.defeats.includes(botChoice)) {
      result.innerHTML = `You win!<br>Enemy chose: ${botChoice}`
      p1 += 1;
    } else {
      result.innerHTML = `You lose!<br>Enemy chose: ${botChoice}`
      p2 += 1;
    }

    document.getElementById('score').innerHTML = score

    return null
  }

  document.getElementById("rock").onclick = () => battle(document.getElementById("rock").id)
  document.getElementById("paper").onclick = () => battle(document.getElementById("paper").id)
  document.getElementById("scissors").onclick = () => battle(document.getElementById("scissors").id)
  document.getElementById("lizard").onclick = () => battle(document.getElementById("lizard").id)
  document.getElementById("spock").onclick = () => battle(document.getElementById("spock").id)
}