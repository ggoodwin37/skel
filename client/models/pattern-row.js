var AmpModel = require('ampersand-model');

module.exports = AmpModel.extend({
    props: {
		id: 'string',
		poolEntry: 'string',
		steps: 'array'
	},
	initialize: function() {
	}
});
