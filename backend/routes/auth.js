const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validate = require('../middleware/validate');
const db = require('../models/index');


router.post('/signup', validate.validateRegister,function(req, res) {
	data = req.body;

	db.User.findOne({ where: { email: data.email }}).then(user => {
		if (user) {
			return res.status(400).json({
				msg: 'User is aleady exist!'
			});
		}
	})

	bcrypt.hash(data.password, 10, (err, hash) => {
		if (err) {
			return res.status(500).send({
				msg: err
			});
		} else {
			db.User.create({
				email: data.email,
				nickname: data.nickname,
				gender: data.gender,
				password: hash
			}).then(_ => {
				console.log("User is created!")
				return res.status(200).send({
					msg: 'Success'
				});
			})
		}})
})

router.post('/login', function(req, res) {
	data = req.body;

	db.User.findOne({ where: { email: data.email }}).then(user => {
	if (user) {
		bcrypt.compare(data.password, user.password, function(err, result) {
			if (!result) {
				return res.status(400).json({
					msg: "Password is incorrect!"
				});
			} else {
				jwt.sign({
					email: user.email,
				 },
				 process.env.JWT_SECRET,
				 {expiresIn: 60*60*24*15},
				 function(err, token) {
					 return res.status(200).json({
						 msg : "Success",
						 token : token
					 });
				  });
			}
		})
	}
	});
})

router.post('/mypage/change_password', validate.isLoggedin, function(req, res) {
	var data = req.body;

	db.User.findOne({ where: { email: req.decoded.email }}).then(user => {
		if (user) {
			bcrypt.compare(data.old_password, user.password, function(err, result) {
				if (!result) {
					return res.status(400).json({
						msg: "Old Password is incorrect!"
					})
				} else {
					bcrypt.hash(data.new_password, 10, (err, hash) => {
						if (err) {
							return res.status(500).send({
								msg: err
							});
						} else {
							user.update({password: hash}, {where: {email: user.email}})
							.then(result=> {
								return res.status(200).send({
									msg: "Password change successful!"
								});
							})
						}})
				}
			})
		}
	})
})

router.get('/mypage', validate.isLoggedin, function(req, res) {
	db.User.findOne({ where: { email: req.decoded.email }}).then(user => {
		if (user) {
			return res.status(200).send({user});
		}
	})
})

router.patch('/mypage', validate.isLoggedin, function(req, res) {

})

router.delete('/mypage', validate.isLoggedin, function(req, res) {
	db.User.destroy({ where: { email: req.body.email }})
	.then(_ => {
		return res.status(200).json({
			msg: 'User delete complete!'
		});
	})
})

module.exports = router;

/*
router.post('/sign-up', userMiddleware.validateRegister, (req, res, next) =>{
	db.query(
		`SELECT * FROM users WHERE LOWER(:) = LOWER(${db.escape(
		  req.body.email
		)});`,
		(err, result) => {
		  if (result.length) {
			return res.status(409).send({
			  msg: 'This email is already in use!'
			});
		  } else {
			// email is available
			bcrypt.hash(req.body.password, 10, (err, hash) => {
			  if (err) {
				return res.status(500).send({
				  msg: err
				});
			  } else {
				// has hashed pw => add to database
				db.query(
				  `INSERT INTO users (id, email, password, registered) VALUES ('${uuid.v4()}', ${db.escape(
					req.body.email
				  )}, ${db.escape(hash)}, now())`,
				  (err, result) => {
					if (err) {
					  throw err;
					  return res.status(400).send({
						msg: err
					  });
					}
					return res.status(201).send({
					  msg: 'Registered!'
					});
				  }
				);
			  }
			});
		  }
		}
	  );
});

router.post('/login', (req, res, next) => {
	db.query(
		`SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
		(err, result) => {
		  // user does not exists
		  if (err) {
			throw err;
			return res.status(400).send({
			  msg: err
			});
		  }
		  if (!result.length) {
			return res.status(401).send({
			  msg: 'Email or password is incorrect!'
			});
		  }
		  // check password
		  bcrypt.compare(
			req.body.password,
			result[0]['password'],
			(bErr, bResult) => {
			  // wrong password
			  if (bErr) {
				throw bErr;
				return res.status(401).send({
				  msg: 'Email or password is incorrect!'
				});
			  }
			  if (bResult) {
				const token = jwt.sign({
					email: result[0].email,
					userId: result[0].id
				  },
				  'SECRETKEY', {
					expiresIn: '7d'
				  }
				);
				db.query(
				  `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
				);
				return res.status(200).send({
				  msg: 'Logged in!',
				  token,
				  user: result[0]
				});
			  }
			  return res.status(401).send({
				msg: 'Email or password is incorrect!'
			  });
			}
		  );
		}
	  );

});
*/
