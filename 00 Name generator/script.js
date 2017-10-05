console.log(`Name Generator made by falbor45 (https://github.com/falbor45)\nCredits to randomuser.me for a name list that has no end!`)

let gender = undefined;

generateUser = () => {
  if (document.getElementById('genderMale').checked) {
    gender = 'male'
  }
  if (document.getElementById('genderFemale').checked) {
    gender = 'female'
  }
  fetchData(gender)
}

fetchData = (gender) => {
  fetch(`https://api.randomuser.me?gender=${gender}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      let {title, first, last} = data.results[0].name
      let {username, password} = data.results[0].login
      let {street, city, state, postcode} = data.results[0].location
      document.getElementById('name').innerHTML = `Name: ${titleCase(title)} ${titleCase(first)} ${titleCase(last)}`
      document.getElementById('login').innerHTML = `Username: ${username}<br />Password: ${password}`
      document.getElementById('location').innerHTML = `State: ${titleCase(state)}<br />Street: ${titleCase(street)}<br />City: ${titleCase(city)}<br />Zip code: ${postcode}`
      document.getElementById('picture').src = data.results[0].picture.thumbnail
    });
}

titleCase = (str) => str.toLowerCase().split(' ').map((word) =>
  word[0].toUpperCase() + word.substr(1)
).join(' ');

document.getElementById('genUser').onclick = () => generateUser()
