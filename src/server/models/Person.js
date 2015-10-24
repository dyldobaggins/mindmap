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
	userName: {				//unique
		type: String,
		default: ""
	},
	concepts: {
		type: [{
			label: String,
			score: Number
		}],
		default: []
	}
});