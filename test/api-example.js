var inspect = require('eyes').inspector({hideFunctions: true, maxLength: null});

module.exports = function(ctx) {
	var Lab = require('lab');

	// Test shortcuts
	var expect = Lab.expect;
	var before = Lab.before;
	var after = Lab.after;
	var describe = Lab.experiment;
	var it = Lab.test;

    var baseUrl = '/api/example';
    var exampleId;
	describe('verify example api:', function () {
        it('should let me create a new example object', function(done) {
            var data = {
                foo: 'bar'
            };
            ctx.server.inject({
                method: 'post',
                payload: data,
                url: baseUrl
            }, function(res) {
                expect(res.statusCode === 200);
                inspect(res.response);
                done();
            });
        });

	});
};
