var hapi = require('hapi');
var config = require('getconfig');
var inspect = require('eyes').inspector({maxLength: null});
var getApiPlugin = require('./api/api');

function startServerInstance(done) {

    var app = {
        config: config,
        inspect: inspect
    };

    var server = new hapi.Server(config.serverPort, config.serverHost, {
        // not using any server views right now.
        // views: {
        //     engines: { jade: require('jade') },
        //     path: __dirname + '/templates'
        // },

        // haven't tested cors yet
        // cors: {
        //     origin: ['*'],
        //     headers: ['Authorization', 'Content-Type', 'If-None-Match', 'Auth-Token']
        // }
    });

    server.pack.register(require('lout'), function () {});

    var serverPackList = [
        {
            plugin: require('moonboots_hapi'),
            options: {
                appPath: '/',
                moonboots: {
                    main: __dirname + '/client/app.js',
                    developmentMode: config.isDev,
                    stylesheets: [
                        __dirname + '/dist/css/main.css'
                    ],
                    beforeBuildJS: function() {
                        // TODO: investigate the build-time streaming approach
                        if (config.isDev) {
                            var templatizer = require('templatizer');
                            templatizer(__dirname + '/templates', __dirname + '/client/templates.js');
                        }

                    }
                }
            }
        }
    ];

    serverPackList.push(getApiPlugin(app));

    server.pack.register(serverPackList, function (err) {
        if (err) throw err;

        server.start(function () {
            console.log('running at', server.info.uri);
            done && done(server);
        });
    });
    return server;
}

module.exports = startServerInstance;
