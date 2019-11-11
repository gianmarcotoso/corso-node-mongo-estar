const users = require('./users.json')
const express = require('express')
const loggingMiddleware = require('./middleware/logging.middleware')
const fileLoggingMiddleware = require('./middleware/file-logging.middleware')
const randomAccessMiddleware = require('./middleware/random-access.middleware')

const errorHandler = require('./middleware/error-handler.middleware')
const errorLogger = require('./middleware/error-logger.middleware')

const app = express()
const port = 3000

app.use(loggingMiddleware, fileLoggingMiddleware)

app.get('/', [
	randomAccessMiddleware,
	(req, res) => {
		res.send('Hello')
	},
])

app.get('/users/count', (req, res, next) => {
	const count = users.length

	return res.send(`Total users: ${count}`)
})

app.get('/users/:id', (req, res, next) => {
	const user = users.find(u => u.id === +req.params.id)
	if (!user) {
		return next(new Error('User not found'))
	}

	return res.send(user.name)
})

app.use([errorLogger, errorHandler])

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)
})
