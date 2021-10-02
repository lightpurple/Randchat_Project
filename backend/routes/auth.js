const express = require('express');
const router = express.Router();

// 인증
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validate = require('../middleware/validate');

// DB
const pool = require('../middleware/pool');

router.post('/signup', validate.validateRegister, async function(req, res) {
	let con1 = await pool.getConnection(async conn => conn)
	con1.beginTransaction()
	var	data = req.body;
	var match_gender = data.gender === 'M' ? 'F' : 'M';

	try {
		const db = await con1.query('SELECT * FROM User WHERE email = ?',[data.email]);
		if (db[0][0]) {
			con1.release()
			return res.status(400).json({
				msg: 'User is aleady exist!'
			});
		}
	} catch (e) {
		con1.release()
		throw e;
	}
	bcrypt.hash(data.password, 10, async (err, hash) => {
		if (err) {
			throw err;
		} else {
			try {
				await con1.query(
					'INSERT INTO User(email, nickname, gender, match_gender, password) VALUES(?, ?, ?, ?, ?)',
					[data.email, data.nickname, data.gender, match_gender, hash]
					)
				con1.commit()
				res.status(200).json({ msg: "Success" });
			} catch (e) {
				con1.rollback()
				con1.release()
				throw e;
			}
			con1.release()
	}})
})


router.post('/login', async function(req, res) {
	data = req.body;

	let con1 = await pool.getConnection(async conn => conn)
	con1.beginTransaction()

	try {
		const db = await con1.query('SELECT * FROM User WHERE email = ?',[data.email]);
		if (db[0][0]) {
			bcrypt.compare(data.password, db[0][0].password, function(err, result) {
				if (!result) {
					res.status(400).json({
						msg: "Password is incorrect!"
					});
				} else {
					jwt.sign({
						email: db[0][0].email,
						},
						process.env.JWT_SECRET,
						{expiresIn: 60*60*24*15},
						function(err, token) {
							if (err) {
							con1.release()
							throw err;
							}
							return res.status(200).json({
								msg : "Success",
								token : token
							});
						});
					}
			})
		} else {
			res.status(400).json({ msg: "Email does not exist!"});
		}
	} catch (e) {
		con1.release()
		throw e;
	}
	con1.release()
})


router.post('/mypage/change_password', validate.isLoggedin, async function(req, res) {
	let con1 = await pool.getConnection(async conn => conn)
	con1.beginTransaction()
	var	data = req.body;
	var email = req.decoded.email;

	try {
		const db = await con1.query('SELECT * FROM User WHERE email = ?',[email]);
		if (db[0][0]) {
			bcrypt.compare(data.old_password, db[0][0].password, function(err, result) {
				if (!result) {
					res.status(400).json({ msg: "Old Password is incorrect!" })
				} else {
					bcrypt.hash(data.new_password, 10, async (err, hash) => {
						if (err) {
							throw err;
						} else {
							try {
								await con1.query('UPDATE User SET password = ? WHERE email = ?',
								[hash, data.email])
								con1.commit()
								res.status(200).send({
									msg: "Password change successful!"
								});
							} catch (e) {
								con1.release()
								throw e;
							}
						}})
				}
			})
			con1.release()
		}
	} catch (e) {
		con1.release()
		throw e;
	}
})

router.get('/mypage', validate.isLoggedin, async function(req, res) {
	let con1 = await pool.getConnection(async conn => conn)
	con1.beginTransaction()

	try {
		const db = await con1.query('SELECT * FROM User WHERE email = ?',[req.decoded.email]);
		if (db[0][0]) {
			let data = db[0][0];
			res.status(200).json({
				email: data.email,
				nickname: data.nickname,
				match_gender: data.match_gender,
				introduce: data.introduce
			});
		}
	} catch (e) {
		con1.release()
		throw e;
	}
	con1.release()
})


router.put('/mypage', validate.isLoggedin, async function(req, res) {
	var data = req.body;
	var email = req.decoded.email;
	let con1 = await pool.getConnection(async conn => conn)
	con1.beginTransaction()

	try {
		let db = await con1.query('SELECT * FROM User WHERE email = ?',[email]);
		if (db[0][0]) {
			try {
				await con1.query('UPDATE User SET nickname = ?, introduce = ?, match_gender = ? WHERE email = ?',
				[data.nickname, data.introduce, data.match_gender, email])
				con1.commit()
				let db = await con1.query('SELECT * FROM User WHERE email = ?',[email]);
				res.status(200).send({
					msg: "User data change successful!",
					nickname: db[0][0].nickname,
					introduce: db[0][0].introduce,
					match_gender: db[0][0].match_gender
				});
			} catch (e) {
				con1.rollback()
				con1.release()
				throw e;
			}
		}
	} catch (e) {
		con1.release()
		throw e;
	}
	con1.release()
})

router.delete('/mypage', validate.isLoggedin, async function(req, res) {
	let con1 = await pool.getConnection(async conn => conn)
	con1.beginTransaction()

	try {
		await con1.query('DELETE FROM User WHERE email = ?', [req.decoded.email])
		con1.commit()
		con1.release()
		return res.status(200).json({ msg: 'User delete complete! '});
	} catch (e) {
		con1.rollback()
		con1.release()
		throw e;
	}
})

module.exports = router;
