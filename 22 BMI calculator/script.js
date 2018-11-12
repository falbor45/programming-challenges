{
  console.log(`BMI calculator made by falbor45 (https://github.com/falbor45)`)

  let measurement = 'metric';

  for (let i = 0; i < document.querySelectorAll('input').length; i++) {
    document.querySelectorAll('input')[i].addEventListener('keypress', event => {
      if ((event.which < 48 || event.which > 57)&& event.which !== 46) {
        event.preventDefault();
      }
      document.querySelectorAll('input')[i].value = document.querySelectorAll('input')[i].value.replace(/\.+$/g, '')
    });
  }

  document.getElementById('measurement').addEventListener('change', event => {
    "use strict";
    measurement = event.target.value;
    document.getElementById('weightSuffix').innerHTML = measurement === 'metric' ? 'kilograms' : 'pounds';
    document.getElementById('heightSuffix').innerHTML = measurement === 'metric' ? 'meters' : 'inches';
    return null;
  });

  document.getElementById('calculate').addEventListener('click', event => {
    "use strict";
    event.preventDefault();
    if (measurement === 'metric') {
      let weight = parseFloat(document.getElementById('weight').value);
      let height = parseFloat(document.getElementById('height').value);
      let BMI = weight / Math.pow(height, 2);

      document.getElementById('result').innerHTML = `Your Body Mass Index is ${BMI.toFixed(2)}`;
      return null;
    }
    if (measurement === 'imperial') {
      let weight = parseFloat(document.getElementById('weight').value);
      let height = parseFloat(document.getElementById('height').value);
      let BMI = (weight / Math.pow(height, 2)) * 703;

      document.getElementById('result').innerHTML = `Your Body Mass Index is ${BMI.toFixed(2)}`;
      return null;
    }
  });
}

