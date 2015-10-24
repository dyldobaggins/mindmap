var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	firstName: {
		type: String,
		default: ""
	},
	lastName: {
		type: String,
		default: ""
	},
});