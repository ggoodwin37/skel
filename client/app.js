var domready = require('domready');

var MainView = require('./views/main');
var Router = require('./router');

var clientConfig = require('./client-config.json');

window.app = {
    config: clientConfig,
    init: function() {
        var self = this;

        this.router = new Router();

        domready(function() {
            self.view = new MainView({
                el: document.body
            });
            self.router.history.start({pushState: true});
        });
    }
};

// TODO: figure out how to pass in a config here.
window.app.init();
