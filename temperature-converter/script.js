console.log(`Temperature converter made by falbor45 (https://github.com/falbor45)`)

let getSel1 = document.getElementById('select1')
let getSel2 = document.getElementById('select2')
let selectQuant = document.getElementById('quantity')
let selectOutp = document.getElementById('output')

convertTemp = (from, to) => {
  let quantVal = parseInt(selectQuant.value)
  if (/^[+-]?\d+$/.test(selectQuant.value) === false) {
    alert('Please type a proper value')
    return null
  }
  if (getSel1.selectedIndex === -1 || getSel2.selectedIndex === -1) {
    alert('Please select an option')
    return null
  }
  if (from === to) {
    selectOutp.innerHTML = quantVal
  }
  if (from === '0' && to === '1') {
    selectOutp.innerHTML = (quantVal * 1.8 + 32).toFixed(2)
  }
  if (from === '0' && to === '2') {
    selectOutp.innerHTML = ((quantVal + 273.15) * 1.8).toFixed(2)
  }
  if (from === '0' && to === '3') {
    selectOutp.innerHTML = (quantVal * 0.8).toFixed(2)
  }
  if (from === '0' && to === '4') {
    selectOutp.innerHTML = (quantVal + 273.15).toFixed(2)
  }
  if (from === '1' && to === '0') {
    selectOutp.innerHTML = ((quantVal - 32) / 1.8).toFixed(2)
  }
  if (from === '1' && to === '2') {
    selectOutp.innerHTML = (quantVal + 459.67).toFixed(2)
  }
  if (from === '1' && to === '3') {
    selectOutp.innerHTML = ((quantVal - 32) * (4 / 9)).toFixed(2)
  }
  if (from === '1' && to === '4') {
    selectOutp.innerHTML = ((quantVal + 459.67) * (5 / 9)).toFixed(2)
  }
  if (from === '2' && to === '0') {
    selectOutp.innerHTML = ((quantVal - 491.67) * (5 / 9)).toFixed(2)
  }
  if (from === '2' && to === '1') {
    selectOutp.innerHTML = (quantVal - 459.67).toFixed(2)
  }
  if (from === '2' && to === '3') {
    selectOutp.innerHTML = ((quantVal - 491.67) * (4 / 9)).toFixed(2)
  }
  if (from === '2' && to === '4') {
    selectOutp.innerHTML = (quantVal * (5 / 9)).toFixed(2)
  }
  if (from === '3' && to === '0') {
    selectOutp.innerHTML = (quantVal * 1.25).toFixed(2)
  }
  if (from === '3' && to === '1') {
    selectOutp.innerHTML = (quantVal * 2.25 + 32).toFixed(2)
  }
  if (from === '3' && to === '2') {
    selectOutp.innerHTML = (quantVal * 2.25 + 32 + 459.67).toFixed(2)
  }
  if (from === '3' && to === '4') {
    selectOutp.innerHTML = (quantVal * 1.25 + 273.15).toFixed(2)
  }
  if (from === '4' && to === '0') {
    selectOutp.innerHTML = (quantVal - 273.15).toFixed(2)
  }
  if (from === '4' && to === '1') {
    selectOutp.innerHTML = (quantVal * 1.8 - 459.67).toFixed(2)
  }
  if (from === '4' && to === '2') {
    selectOutp.innerHTML = (quantVal * 1.8).toFixed(2)
  }
  if (from === '4' && to === '3') {
    selectOutp.innerHTML = ((quantVal - 273.15) * 0.8).toFixed(2)
  }
}
document.getElementById('convert').onclick = () => convertTemp(getSel1.options[getSel1.selectedIndex].value, getSel2.options[getSel2.selectedIndex].value)