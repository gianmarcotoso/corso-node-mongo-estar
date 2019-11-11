const multiply = require('./multiply')

const [, , a, b] = process.argv

console.log(multiply(a, b))
