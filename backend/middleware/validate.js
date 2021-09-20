const Isemail = require('isemail');
const jwt = require('jsonwebtoken');

var validate = {};

validate.validateRegister = function (req, res, next){
	data = req.body;

	if (!(data.email && Isemail.validate(data.email) && data.gender &&
	(data.gender === 'F' || data.gender === 'M') && data.nickname && data.password
	&& data.password.length >= 8)) {
		return res.status(400).send({
			msg: 'Something wrong!'
		});
	}
	next();
}

validate.isLoggedin = function(req,res,next){
	var token = req.headers['x-access-token'];

	if (!token) {
		return res.status(403).send({
		  msg: "No token provided!"
		});
	  }

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).send({
			msg: "Unauthorized!"
			});
		}
		req.decoded = decoded;
		next();
	});
};

module.exports = validate;
