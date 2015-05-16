var Lab = require('lab');
var Hapi = require('hapi');
var config = require('getconfig');

var getApiPlugin = require('../api/api');

// Test shortcuts
var before = Lab.before;

// shared test context
var ctx = {
    server: null,
    table: null,

    app: {config: config},

    getRouteKey: function(route) {
        var routeKey = route.method.toLowerCase() + ' ' + route.path;
        return routeKey;
    },
    inspect: require('eyes').inspector({hideFunctions: true, maxLength: null})
};

before(function(done) {
    ctx.server = new Hapi.Server(8080, 'localhost');
    ctx.server.pack.register(getApiPlugin(ctx.app), function (err) {
        if (err) throw err;
        ctx.server.start(function () {
            console.log('test is running at', ctx.server.info.uri);
            done();
        });
    });
});

require('./server')(ctx);
require('./mongo-mongoose')(ctx);
require('./api-example')(ctx);
