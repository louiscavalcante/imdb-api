const db = require('../config/db.js')

module.exports = {
	create(data, callback) {
		const query = `
            INSERT INTO ratings (
                averagerating,
                numvotes
            ) VALUES ($1, $2)
            RETURNING tconst
        `

		const values = [data.averagerating, data.numvotes]

		db.query(query, values, function (err, results) {
			if (err) throw `Database error! ${err}`

			callback()
		})
	},

	update(data, id, callback) {
		const query = `
            UPDATE ratings SET
                averagerating=($1),
                numvotes=($2)
            WHERE tconst = $3
        `

		const values = [
			data.averagerating,
			data.numvotes,
			id,
		]

		db.query(query, values, function (err, results) {
			if (err) throw `Database error! ${err}`

			callback()
		})
	},
}