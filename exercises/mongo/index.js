const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'

async function getDatabase() {
	try {
		const client = await MongoClient.connect(url, { useUnifiedTopology: true })

		const db = client.db('mydatabase')

		return { db, client }
	} catch (err) {
		throw err
	}
}

async function bootstrap() {
	const { db, client } = await getDatabase()

	await client.close()

	console.log('Done!')
}

bootstrap()
