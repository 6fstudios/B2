var Hapi = require('hapi');
var Path = require('path');
var Hoek = require('hoek');

var routes = require('./routes');

var server = new Hapi.Server();

server.connection({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8081
});

server.register(require('vision'), (err) => {

    Hoek.assert(!err, err);

    server.views({
        engines: {
            jade: require('jade')
        },
        path: __dirname + '/templates',
        compileOptions: {
            pretty: true
        }
    });
});

server.register(require('inert'), function(err) {
    if (err) {
        throw err;
    }
});

// Add the route
server.route(routes);

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
