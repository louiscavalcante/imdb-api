const Titles = require('../models/model.js')

module.exports = {
	index(req, res) {
		Titles.all(titles => {
			return res.json(titles)
		})
	},
	post(req, res) {
		if (Object.keys(req.body).length < 8) return res.status(400).send('Please fill the body!')

		Titles.create(req.body, function (id) {
			Titles.findId(id, function (movie) {
				return res.json(movie)
			})
		})
	},
	show(req, res) {
		Titles.find(req.query.find, function (moviesFound) {
			if (moviesFound.length === 0) return res.send('Entry not found!')

			return res.json(moviesFound)
		})
	},
	put(req, res) {
		Titles.findId(req.params.id, function (found) {
			if (!found) return res.send('ID not found!')

			if (Object.keys(req.body).length < 8)
				return res.status(400).send('Please fill the body!')

			Titles.update(req.body, req.params.id, function () {
				Titles.findId(req.params.id, function (movie) {
					return res.json(movie)
				})
			})
		})
	},
	delete(req, res) {
		Titles.findId(req.params.id, function (found) {
			if (!found) return res.send('ID not found!')

			Titles.delete(req.params.id, function () {
				Titles.all(titles => {
					return res.json(titles)
				})
			})
		})
	},
}
