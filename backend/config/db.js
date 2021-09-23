module.exports = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DB,
	password: process.env.DB_PWD,
	connectionLimit: process.env.DB_CONLIMT,
	ssl: true
}
