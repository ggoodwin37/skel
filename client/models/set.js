var AmpModel = require('ampersand-model');

var ExampleModel = AmpModel.extend({
	props: {
		example: 'string'
	},
	initialize: function(id) {
        this.id = id;
	},
	url: function() {
		return '/api/example/' + this.id;
	}
});

module.exports = ExampleModel;
