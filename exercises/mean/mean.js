const { mean } = require('ramda')

const [, , ...numbers] = process.argv

console.log(mean(numbers))
