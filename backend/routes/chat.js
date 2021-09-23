const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const pool = require('../middleware/pool');

router.get('/', validate.isLoggedin, async function(req, res){
	var email = req.decoded.email;
	let con1 = await pool.getConnection(async conn => conn)
	con1.beginTransaction()

	try {
		const db = await con1.query('SELECT * FROM User WHERE email = ?',[email]);
		if (db[0][0]) {
			res.status(200).json({
				msg: 'Success',
				nickname: db[0][0].nickname,
				introduce: db[0][0].introduce
			})
			con1.release()
		}
	} catch(e) {
		con1.release()
		throw e;
	}
})

module.exports = router;
