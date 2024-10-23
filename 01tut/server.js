// You should already know :   HTML, CSS & Javascript
// Possibly experience with other libraries and frameworks

// How NodeJS differs from Vanilla JS
// 1 :- Node runs in a server - not in a browser (Backend not Frontend)
// 2 :- The console is the terminal window ("node filename" command to see console in terminal.)

console.log("Hello World!");

// 3 :- global object instead of window object

// console.log(global);

// 4 :- Has Common Core modules that we will explore.
// 5 :- CommonJS modules instead of ES6 modules.
// 6 :- Missing some JS APIs like fetch

const os = require('os')
const path = require('path')
const math = require('./math')
const { add, substract, multiply, divide } = require('./math')

console.log(math.add(4, 3))
console.log(add(4, 3))
console.log(substract(4, 3))
console.log(multiply(4, 3))
console.log(divide(4, 3))

// console.log(os.type())
// console.log(os.version())
// console.log(os.homedir())

// console.log(__dirname)
// console.log(__filename)

// console.log(path.dirname(__filename))
// console.log(path.basename(__filename))
// console.log(path.extname(__filename))
// console.log(path.parse(__filename))