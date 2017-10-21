console.log(`Age in seconds converter made by falbor45 (https://github.com/falbor45)`)

Date.prototype.excludeTime = () => {
  let date = new Date()
  date.setHours(0, 0, 0, 0)
  return date
}

calculateAge = () => {
  let secondsArr = []
  let seconds, dob;
  dob = document.getElementById('dob').value
  let today = new Date()
  today = today.excludeTime()
  dob = dob.split('-')
  for (let i = 0; i < dob.length; i++) {
    dob[i] = parseInt(dob[i])
  }
  dob = new Date(dob[0], dob[1] - 1, dob[2], 0, 0, 0, 0)
  for (let i = parseInt(dob.getFullYear()); i <= parseInt(today.getFullYear()); i++) {
    if (i % 4 === 0) {
      secondsArr.push(31622400000)
    } else {
      secondsArr.push(31556926000)
    }
  }
  secondsArr[secondsArr.length - 1] = (secondsArr[secondsArr.length - 1] - (new Date(today.getFullYear() + 1, 0, 1) - today))
  secondsArr[0] = (secondsArr[0] - (dob - new Date(dob.getFullYear(), 0, 1)))
  seconds = (secondsArr.reduce((a, b) => a + b)) / 1000
  document.getElementById("output").innerHTML = `Your age is ${seconds} in seconds!`
}

document.getElementById('calculateAge').onclick = () => calculateAge()