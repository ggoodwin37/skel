module.exports = function(ctx) {
	var Lab = require('lab');
	var async = require('async');

	// Test shortcuts
	var expect = Lab.expect;
	var before = Lab.before;
	var after = Lab.after;
	var describe = Lab.experiment;
	var it = Lab.test;

	describe('race-order-bug', function() {

		function deleteAllPoolEntries(done) {
			ctx.getSet(function(res) {
				var taskList = [];
				res.result.pool.forEach(function(poolEntry) {
					taskList.push(function(callback) {
						ctx.server.inject({method: 'delete', url: ctx.baseSetUrl + '/poolentry/' + poolEntry.id}, function(res) {
							expect(res.statusCode).to.equal(200);
							callback();
						});
					});
				});
				async.series(taskList, function() {
					done();
				});
			});
		}

		it('should be cool to delete all pool entries', function(done) {
			deleteAllPoolEntries(done);
		});

		it('is now a smoldering hole in the ground', function(done) {
			ctx.getSet(function(res) {
				if (res.result.pool.length >= 1) console.log(res.result.pool[0].id);
				expect(res.result.pool.length).to.equal(0);
				done();
			});
		});

		var numTries = 100;
		it('attempts to reproduce the race condition with n=' + numTries, {timeout: numTries * 100}, function(done) {
			function runLoop() {
				var entryId1, entryId2;
				async.series([
					deleteAllPoolEntries,
					function(callback) {
						ctx.server.inject({method: 'post', url: ctx.baseSetUrl + '/poolentry'}, function(res) {
							expect(res.statusCode).to.equal(200);
							entryId1 = res.result.id;
							callback();
						});
					},
					function(callback) {
						ctx.server.inject({method: 'post', url: ctx.baseSetUrl + '/poolentry'}, function(res) {
							expect(res.statusCode).to.equal(200);
							entryId2 = res.result.id;
							callback();
						});
					},
					function(callback) {
						ctx.getSet(function(res) {
							expect(res.result.pool.length).to.equal(2);
							callback();
						});
					},
					function(callback) {
						ctx.server.inject({method: 'delete', url: ctx.baseSetUrl + '/poolentry/' + entryId1}, function(res) {
							expect(res.statusCode).to.equal(200);
							callback();
						});
					}
				], function() {
					ctx.getSet(function(res) {
						expect(res.result.pool.length).to.equal(1);
						expect(res.result.pool[0].id).to.equal(entryId2);
						
						tryNextLoop();
					});
				});
			};

			function tryNextLoop() {
				if (--counter > 0) {
					setTimeout(runLoop, 0);  // so we don't eat up callstack
				} else {
					done();
				}
			};

			var counter = numTries;
			runLoop();
		});
	});
};
