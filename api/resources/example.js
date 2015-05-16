var inspect = require('eyes').inspector({hideFunctions: true, maxLength: null});
var async = require('async');
var _ = require('underscore');

var handlingError = require('../handling-error');
var handlingErrorOrMissing = require('../handling-error-or-missing');
var StepList = require('../../step-list');

module.exports = function(app, opts) {
    var exampleFactory = require('../models/example')(app);

	return {
        index: function(request, reply) {
            // TODO
            reply();
        },
		show: function(request, reply) {
            var id = request.params.example_id;
            exampleFactory.findById(id, function(err, result) {
                if (handlingErrorOrMissing(err, reply)) return;
                reply(null, result);
            });
		},
		create: function(request, reply) {
            var newModel = new exampleFactory(request.payload);
            newModel.save(function(err, newModelResult) {
                if (handlingError(err, reply)) return;
                reply(null, newModelResult);
            });
		},
		update: function(request, reply) {
            // TODO
            reply();
		},
		destroy: function(request, reply) {
            var id = request.params.example_id;
            exampleFactory.findById(id, function(err, findResult) {
                if (handlingErrorOrMissing(err, reply)) return;
                findResult.remove(function(err, removeResult) {
                    if (handlingError(err, reply)) return;
                    reply(null, removeResult);
                });
            });
		}
	};
};
