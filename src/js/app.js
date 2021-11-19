// import Widget from './widget';

// const conteiner = new Widget();http://httpbin.org/

// conteiner.events();
// const url = 'https://rebikhub-http.herokuapp.com/';
const urlServer = 'http://localhost:3333';
const pathGet = 'allTickets';
const pathPost = 'create';
const bodyPost = JSON.stringify('hi servak!');

// fetch(`${urlServer}/${pathGet}`)
//   .then((response) => response.json().then((data) => console.log(data)));
fetch(`${urlServer}`, {
  method: 'POST',
  body: bodyPost,
})
  .then((status) => console.log(status.json()))
  .catch((error) => console.log(error));
