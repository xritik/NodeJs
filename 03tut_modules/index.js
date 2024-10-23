// 1 :- npm i nodemon -g
console.log('testing'); // type "nodemon" in terminal to run 'index.js' file.

// 2 :- npm init
// 3 :- npm i date-fns
const {format} = require('date-fns')
console.log(format(new Date(), 'dd/MM/yyyy\tHH:mm:ss'))

// 4 :- npm i uuid
const {v4: uuid } = require('uuid');
console.log(uuid());