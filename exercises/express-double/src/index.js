const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const port = 3000

app.use(bodyParser.json())

app.post('/double', function(req, res, next) {
	const { number } = req.body

	res.send(`Your number is: ${number * 2}`)
})

app.listen(port, function() {
	console.log(`Application listening on port ${port}`)
})
