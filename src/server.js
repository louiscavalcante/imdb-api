const express = require('express')
const routes = require('./routes.js')

const server = express()
const PORT = 5000

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(routes)

server.use(function (req, res) {
	res.status(404).send('Page not found')
})

server.listen(PORT, function () {
	console.log(`Server is running at http://localhost:${PORT}`)
})
