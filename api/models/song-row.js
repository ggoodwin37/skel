var mongoose = require('mongoose');

var modelName = 'song-row';
var schema = mongoose.Schema({
	parent_id: mongoose.Schema.Types.ObjectId,
	pattern_id: mongoose.Schema.Types.ObjectId,
	offset: Number,
	len: Number,
	count: Number
});
var factory = mongoose.model(modelName, schema);

module.exports = factory;
