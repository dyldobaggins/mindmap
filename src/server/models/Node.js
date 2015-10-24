var mongoose = require('mongoose');

module.exports = mongoose.model('Node', {
	userid: String,
	map: {
		type: Object,
		default: {}
	}
});