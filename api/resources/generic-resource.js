var inspect = require('eyes').inspector({hideFunctions: true, maxLength: null});
var async = require('async');
var _ = require('underscore');

var handlingError = require('../handling-error');
var handlingErrorOrMissing = require('../handling-error-or-missing');
var StepList = require('../../step-list');

module.exports = function(app, opts) {

	return {
		show: function(request, reply) {
			// var itemId = request.params[routeItemIdKey];
			// var query = itemFactory.findById(itemId);
			// if (populateFields) {
			// 	query.populate(populateFields);
			// }
			// var execQuery = function() {
			// 	query.exec(function(err, itemModel) {
			// 		if (handlingErrorOrMissing(err, itemModel, reply)) return;
			// 		return reply(itemModel.toJSON());
			// 	});
			// }
			// var fakeDelayMs = 0;
			// if (app.config.fakeDelayOnGetMs > 0) {
			// 	setTimeout(execQuery, app.config.fakeDelayOnGetMs);
			// } else {
			// 	execQuery();
			// }
            reply();
		},
		create: function(request, reply) {
			// var parentId = request.params[routeParentIdKey],
			// 	newModel;
			// function createAndSaveNewModel(cb) {
			// 	var newData = _.extend({parent_id: parentId}, request.payload);
			// 	newModel = new itemFactory(newData);
			// 	newModel.save(function(err, newModelResult) {
			// 		if (handlingError(err, reply)) return;
			// 		cb(null, newModelResult.id);
			// 	});
			// }
			// function updateParentModelCollection(newModelId, cb) {
			// 	var parentQuery = {};
			// 	parentQuery[parentQueryField] = parentId;
			// 	parentFactory.findOne(parentQuery, function(err, parentModel) {
			// 		if (handlingError(err, reply)) return;
			// 		parentModel[parentCollection].push(newModelId);
			// 		parentModel.save(function(err, parentModel) {
			// 			if (handlingError(err, reply)) return;
			// 			cb(null);
			// 		});
			// 	});
			// }
			// async.waterfall([createAndSaveNewModel, updateParentModelCollection], function(err) {
			// 	if (handlingError(err, reply)) return;
			// 	reply(newModel.toJSON());
			// });
            reply();
		},
		update: function(request, reply) {
			// var itemId = request.params[routeItemIdKey] || null
			// treeUpdate(opts, itemId, request.payload, reply);
            reply();
		},
		destroy: function(request, reply) {
			// var parentId = request.params[routeParentIdKey];
			// var itemId = request.params[routeItemIdKey];
			// itemFactory.findById(itemId, function(err, itemModel) {  // make sure it exists
			// 	if (handlingErrorOrMissing(err, itemModel, reply)) return;
			// 	treeDelete(itemModel, opts, reply, function(err) {
			// 		if (handlingError(err, reply)) return;
			// 		reply();
			// 	});
			// });
            reply();
		}
	};
};
