const express = require('express')
const connect = require('./utils/connect.util')
const bodyParser = require('body-parser')
const port = 3000
const { ObjectID } = require('mongodb')

async function start() {
	const { db, client } = await connect('mydatabase')

	const app = express()

	app.use(
		bodyParser.json({
			type: 'application/json',
		}),
	)

	app.get('/todos', async (req, res) => {
		const todosCollection = db.collection('todos')
		const todos = await todosCollection.find().toArray()

		return res.json(todos)
	})

	app.post('/todos', async (req, res, next) => {
		const todosCollection = db.collection('todos')
		const { title } = req.body
		if (!title) {
			return next(new Error('ERR_NO_TITLE'))
		}

		await todosCollection.insertOne({ title })

		return res.status(200).send()
	})

	app.put('/todos/:id', async (req, res, next) => {
		const todosCollection = db.collection('todos')
		const { id } = req.params
		const result = await todosCollection.updateOne(
			{ _id: ObjectID(id) },
			{ $set: { completed: true } },
		)
		if (result.modifiedCount === 0) {
			return next(new Error('ERR_NOT_FOUND'))
		}

		return res.status(200).send()
	})

	app.delete('/todos', async (req, res, next) => {
		const todosCollection = db.collection('todos')
		await todosCollection.deleteMany({})

		return res.status(200).send()
	})

	app.delete('/todos/:id', async (req, res, next) => {
		const todosCollection = db.collection('todos')
		const { id } = req.params
		const result = await todosCollection.deleteOne({ _id: ObjectID(id) })
		if (result.deletedCount === 0) {
			return next(new Error('ERR_NOT_FOUND'))
		}

		return res.status(200).send()
	})

	app.listen(port, function() {
		console.log(`App listening on port ${port}`)
	})
}

start()
