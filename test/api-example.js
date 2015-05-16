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
                example: 'test-value'
            };
            ctx.server.inject({
                method: 'post',
                payload: data,
                url: baseUrl
            }, function(res) {
                expect(res.statusCode === 200);
                exampleId = res.result.id;
                expect(typeof exampleId === 'string');
                done();
            });
        });

        it('should let me read back the example object I just created', function(done) {
            ctx.server.inject({
                method: 'get',
                url: baseUrl + '/' + exampleId
            }, function(res) {
                expect(res.statusCode === 200);
                expect(res.result.example === 'test-value');
                done();
            });
        });

        // TODO: index, put

        it('should let me delete the example object I just created', function(done) {
            ctx.server.inject({
                method: 'delete',
                url: baseUrl + '/' + exampleId
            }, function(res) {
                expect(res.statusCode === 200);
                done();
            });
        });
        it('should fail to read the thing I just deleted', function(done) {
            ctx.server.inject({
                method: 'get',
                url: baseUrl + '/' + exampleId
            }, function(res) {
                expect(res.statusCode === 404);
                done();
            });
        });

    });
};
