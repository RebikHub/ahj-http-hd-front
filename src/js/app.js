import Widget from './widget';
import Memory from './memory';

console.log('app started');

const conteiner = new Widget();
const tickets = new Memory();
// console.log(tickets.load());
conteiner.events(tickets);
