const db = require('../config/db.js')

module.exports = {
	all(callback) {
		db.query(
			`
            SELECT *
            FROM titles
			JOIN ratings ON ratings.tconst = titles.tconst
			ORDER BY titles.tconst
            `,
			function (err, results) {
				if (err) throw `Database error! ${err}`

				callback(results.rows)
			}
		)
	},

	create(data, callback) {
		const query = `
            INSERT INTO titles (
                titletype,
                primarytitle,
                originaltitle,
                isadult,
                startyear,
                endyear,
                runtimeminutes,
                genres
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING tconst
        `

		const values = [
			data.titletype,
			data.primarytitle,
			data.originaltitle,
			data.isadult,
			data.startyear,
			data.endyear || '\\N',
			data.runtimeminutes,
			data.genres,
		]

		db.query(query, values, function (err, results) {
			if (err) throw `Database error! ${err}`

			callback(results.rows[0].tconst)
		})
	},
	
	find(filter, callback) {
		db.query(
			`
            SELECT titles.*, ratings.averageRating, ratings.numVotes
            FROM titles
			LEFT JOIN ratings ON ratings.tconst = titles.tconst
            WHERE titles.tconst ILIKE '%${filter}%'
			OR titles.primarytitle ILIKE '%${filter}%'
			OR titles.originaltitle ILIKE '%${filter}%'
			OR titles.titletype ILIKE '%${filter}%'
			OR titles.startyear ILIKE '%${filter}%'
			`,
			function (err, results) {
				if (err) throw `Database error! ${err}`

				callback(results.rows)
			}
		)

	},

	findId(id, callback) {
		db.query(
			`
            SELECT titles.*, ratings.averageRating, ratings.numVotes
            FROM titles
			LEFT JOIN ratings ON ratings.tconst = titles.tconst
            WHERE titles.tconst = $1`,
			[id],
			function (err, results) {
				if (err) throw `Database error! ${err}`

				callback(results.rows[0])
			}
		)
	},

	update(data, id, callback) {
		const query = `
            UPDATE titles SET
                titletype=($1),
                primarytitle=($2),
                originaltitle=($3),
                isadult=($4),
                startyear=($5),
                endyear=($6),
                runtimeminutes=($7),
				genres=($8)
            WHERE tconst = $9
        `

		const values = [
			data.titletype,
			data.primarytitle,
			data.originaltitle,
			data.isadult,
			data.startyear,
			data.endyear || '\\N',
			data.runtimeminutes,
			data.genres,
			id,
		]

		db.query(query, values, function (err, results) {
			if (err) throw `Database error! ${err}`

			callback()
		})
	},

	delete(id, callback) {
		db.query(`DELETE FROM titles WHERE tconst = $1`, [id], function (err, results) {
			if (err) throw `Database error! ${err}`

			callback()
		})
	},
}
