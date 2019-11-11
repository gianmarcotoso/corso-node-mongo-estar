module.exports = function(req, res, next) {
	const number = Math.floor(Math.random() * 100)

	if (number % 2 === 1) {
		return next(new Error('ODD_NUMBER'))
	}

	return next()
}
