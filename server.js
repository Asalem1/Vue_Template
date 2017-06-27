'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Path = require('path');

// Create a server with a host and port
const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname) //sets the relative path
            }
        }
    }
});
server.connection({ port: 3000, host: 'localhost' });

// Add the route
// server.route({
//     method: 'GET',
//     path: '/{name}',
//     handler: function (request, reply) {
//         reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
//     }
// });

// Set the static file path
server.register(require('inert'), (err) => {
    if (err) {
        throw err;
    }
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.file('./index.html');
        }
    });
    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});

server.route({
    method: 'POST',
    path: '/',
    handler: function (request, reply) {
        console.log('here is the request: ', request);
        console.log('here is the reply: ', reply);
    }
});
// server.register({
//     register: Good,
//     options: {
//         reporters: {
//             console: [{
//                 module: 'good-squeeze',
//                 name: 'Squeeze',
//                 args: [{
//                     response: '*',
//                     log: '*'
//                 }]
//             }, {
//                 module: 'good-console'
//             }, 'stdout']
//         }
//     }
// }, (err) => {
//     if (err) {
//         throw err; // something bad happened loading the plugin
//     }
//     server.start((err) => {
//         if (err) {
//             throw err;
//         }
//         server.log('info', 'Server running at: ' + server.info.uri);
//     });
// });
