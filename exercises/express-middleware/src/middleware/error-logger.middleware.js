const { appendFile } = require('fs')
const { promisify } = require('util')

const appendFileAsync = promisify(appendFile)

module.exports = async function(err, req, res, next) {
	await appendFileAsync(
		'error.log',
		`Error on ${req.path}: ${err.message}\n`,
		{
			encoding: 'utf-8',
		},
	)
	next(err)
}
