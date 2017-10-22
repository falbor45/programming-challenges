console.log(`Fizz Buzz made by falbor45 (https://github.com/falbor45)`)

calcFizzBuzz = () => {
  let minRange = parseInt(document.getElementById("min").value)
  let maxRange = parseInt(document.getElementById("max").value)
  let output = []
  minRange > maxRange ? document.getElementById("output").innerHTML = "Minimum value should not exceed maximum value" : null;
  isNaN(minRange) || isNaN(maxRange) ? document.getElementById("output").innerHTML = "Please, type in number to the input" : null

  for (let i = minRange; i <= maxRange; i++) {
    if (i % 3 === 0 && i % 5 !== 0) {
      output.push('Fizz')
    }
    if (i % 5 === 0 && i % 3 !== 0) {
      output.push("Buzz")
    }
    if (i % 3 === 0 && i % 5 === 0) {
      output.push("Fizz Buzz")
    }
    if (i % 3 !== 0 && i % 5 !== 0) {
      output.push(i)
    }
  }
  output.length !== 0 ? document.getElementById("output").innerHTML = output.join(', ') : null
}

document.getElementById("calculate").onclick = () => calcFizzBuzz()