var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	firstName: {
		type: String,
		default: ""
	},
	lastName: {
		type: String,
		default: ""
	},
	userName: {
		type: String,
		default: ""
	},
	concepts: {
		type: Object,
		default: {}
	},
	userMap: {
		type: Object,
		default: {}
	}
}, { minimize: false });

module.exports = mongoose.model('User', schema);