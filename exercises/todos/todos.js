const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'

async function connect() {
	try {
		const client = await MongoClient.connect(url, { useUnifiedTopology: true })
		const db = client.db('mydatabase')

		return { db, client }
	} catch (err) {
		throw err
	}
}

async function bootstrap() {
	try {
		const [, , add, flag] = process.argv

		const { db, client } = await connect()

		const todos = db.collection('todos')
		if (add) {
			if (add === '--reset') {
				await todos.deleteMany({})
			} else {
				if (flag === '-r') {
					const result = await todos.deleteOne({ title: add })
					if (result.deletedCount === 0) {
						console.log('Elemento non trovato')
					}
				} else if (flag === '-c') {
					const result = await todos.updateOne(
						{ title: add },
						{ $set: { completed: true } },
					)
					if (result.modifiedCount === 0) {
						console.log('Elemento non trovato')
					}
				} else {
					await todos.insertOne({ title: add })
				}
			}
		} else {
			const allTodos = await todos.find().toArray()

			allTodos.forEach(todo => {
				console.log(`* ${todo.title} ${todo.completed ? '[OK]' : ''}`)
			})
		}

		await client.close()
	} catch (error) {
		console.error(error)
	}
}

bootstrap()
