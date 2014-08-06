module.exports = function(app) {
	var resources = {
		test1: require('./resources/test1'),
		set: require('./resources/set')(app),
		setSong: require('./resources/set-song')(app),
		sample: require('./resources/sample')(app)
	};

	// TODO gideong: where do we consume this? might have to move
	var dulcimer = require('dulcimer');
	dulcimer.connect({
		type: 'level',
		path: __dirname + '/db',
		bucket: 'rhythm-ninja'
	});

	var apiServerPack = {
		plugin: require('mudskipper'),
		options: {
			namespace: 'api',
			resources: resources
		}
	};
	return apiServerPack;
};
