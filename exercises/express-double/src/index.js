/* Esempio: Upload di un file */

// ATTENZIONE! Questo codice è esclusivamente
// a scopo esemplificativo e non è sicuro.
// --> NON USARE IN PRODUZIONE! <--

const express = require('express')
const multer = require('multer')
const { rename } = require('fs')
const { promisify } = require('util')

const upload = multer({ dest: 'uploads/' })
const app = express()
const port = 3000

const renameAsync = promisify(rename)

app.post('/', upload.single('image'), async (req, res, next) => {
	await renameAsync(
		`uploads/${req.file.filename}`,
		`uploads/${req.file.originalname}`,
	)

	return res.send(`Ok!`)
})

app.listen(port, () => {
	console.log(`Upload app listening on port ${port}!`)
})
