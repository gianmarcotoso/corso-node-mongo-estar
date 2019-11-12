const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'
const poolSize = 12

let client

async function connect(databaseName) {
	if (!client) {
		client = await MongoClient.connect(url, {
			useUnifiedTopology: true,
			poolSize,
		})
	}

	const db = client.db(databaseName)

	return { client, db }
}

module.exports = connect
