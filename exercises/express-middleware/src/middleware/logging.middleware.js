module.exports = function(req, res, next) {
	console.log(`I have received a request at ${req.path}`)
	next()
}
