const { appendFile } = require('fs')
const { promisify } = require('util')

const appendFileAsync = promisify(appendFile)

module.exports = async function(req, res, next) {
	await appendFileAsync('app.log', `Request on: ${req.path}\n`, {
		encoding: 'utf-8',
	})
	next()
}
