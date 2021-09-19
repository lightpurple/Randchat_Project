const Isemail = require('isemail');

module.exports = function validateRegister(data){
	if (!(data.email && Isemail.validate(data.email))) {
		return false;
	}
	if (!(data.gender && (data.gender == 'F' || data.gender == 'M')))
		return false;
	if (!(data.nickname && data.password && data.password.length >= 8))
		return false;
	return true;
}
