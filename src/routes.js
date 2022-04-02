const express = require('express')
const routes = express.Router()
const Controller = require('./app/controllers/controller.js')

//! -------------------- imdb 
routes.get('/', Controller.index)
routes.post('/add', Controller.post)
routes.get('/movies', Controller.show)
routes.put('/update/:id', Controller.put)
routes.delete('/delete/:id', Controller.delete)

module.exports = routes
