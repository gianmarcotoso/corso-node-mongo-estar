const users = require('./users.json')
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
	res.send('Hello')
})

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

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)
})
