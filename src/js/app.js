// import Widget from './widget';

// const conteiner = new Widget();http://httpbin.org/

// conteiner.events();https://rebikhub-http.herokuapp.com/
const url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
fetch(url, { mode: 'no-cors' })
  .then((response) => console.log(response.json()))
  .then((data) => console.log(data));
