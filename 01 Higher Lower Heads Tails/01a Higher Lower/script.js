let chosenNumber;
let chosenTries;
let chosenMinVal;
let chosenMaxVal;
let leftTries;

generateGameRules = (minVal, maxVal, tries) => {
  if (parseInt(minVal) > parseInt(maxVal)) {
    alert('Minimum value cannot be higher than maximum value!')
    return null
  }
  if (/^[+-]?\d+$/.test(minVal) === false || /^[0-9]+$/.test(tries) === false || /^[+-]?\d+$/.test(maxVal) === false) {
    alert('Please type proper values')
    return null
  }
  chosenNumber = Math.floor(Math.random() * (parseInt(maxVal) - parseInt(minVal))) + parseInt(minVal)
  chosenTries = parseInt(tries)
  chosenMinVal = parseInt(minVal)
  chosenMaxVal = parseInt(maxVal)
  leftTries = parseInt(tries)
  document.getElementById('game-intro-wrapper').style.display = 'none';
  document.getElementById('game-wrapper').style.display = 'inherit'
  document.getElementById('confirm-number').style.display = 'inherit'
  document.getElementById('reset-game').style.display = 'none'
}

handleGameUpdate = (pickedNum) => {
  if (/^[0-9]+$/.test(pickedNum) === false) {
    document.getElementById('game-message').innerHTML = 'Wrong value'
    return null
  }
  let pickedNumber = parseInt(pickedNum)
  if (pickedNumber < chosenNumber) {
    document.getElementById('game-message').innerHTML = 'Go higher!'
  }
  if (pickedNumber > chosenNumber) {
    document.getElementById('game-message').innerHTML = 'Go lower!'
  }
  if (pickedNumber === chosenNumber) {
    leftTries -=1
    document.getElementById('game-message').innerHTML = `Congrats, you won!\nIt took you ${chosenTries - leftTries === 1 ? `1 try` : `${chosenTries - leftTries} tries`} to guess my number!`
    document.getElementById('confirm-number').style.display = 'none'
    document.getElementById('reset-game').style.display = 'inherit'
    return null
  }
  leftTries -= 1
  if (leftTries === 0) {
    document.getElementById('game-message').innerHTML = `You ran out of tries :( The number was ${chosenNumber}. Better luck next time!`
    document.getElementById('confirm-number').style.display = 'none'
    document.getElementById('reset-game').style.display = 'inherit'
  }
}

clearInputs = () => {
  let elements = document.getElementsByTagName("input");
  for (let i=0; i < elements.length; i++) {
    if (elements[i].type === "text") {
      elements[i].value = "";
    }
  }
}

console.log(`Higher/Lower game made by falbor45 (https://github.com/falbor45)`)
document.getElementById('game-wrapper').style.display = 'none'
document.getElementById('start-game').onclick = () => generateGameRules(document.getElementById('min-val').value, document.getElementById('max-val').value, document.getElementById('tries').value)
document.getElementById('confirm-number').onclick = () => handleGameUpdate(document.getElementById('number-pick').value)
document.getElementById('reset-game').onclick = () => {document.getElementById('game-intro-wrapper').style.display = 'inherit'; document.getElementById('game-wrapper').style.display = 'none'; clearInputs()}