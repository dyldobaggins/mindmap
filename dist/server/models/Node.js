var mongoose = require('mongoose');

module.exports = mongoose.model('Node', {
	map: {
		type: Object,
		default: {}
	},
	concepts: {
		type: [{
			name: String,
			score: Number
		}],
		default: []
	}
});