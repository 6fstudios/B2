var hapi = require('hapi');
var rp = require('request-promise');
var config = require('config');
var tasks = {};

tasks.view = function(request, reply) {
    var options = {
        uri: config.apiUrl + '/tasks/' + request.params.taskId,
        qs: {
            format: 'json'
        },
        headers: {
            'Authorization': config.token
        },
        json: true // Automatically parses the JSON string in the response 
    };
    return rp(options)
        .then(function(data) {
            reply.view('task', {
                task: data
            });
        })
        .catch(function(err) {
            console.error(err);
        });
}

tasks.getTask = function(request, reply) {
    reply({
        success: true
    });
}

tasks.updateTask = function(request, reply) {
    var options = {
        method: 'POST',
        uri: config.apiUrl + '/tasks',
        body: {
            'Id': request.params.taskId,
            'EntityState': {
                'Id': request.payload.state
            }
        },
        headers: {
            'Authorization': config.token
        },
        json: true // Automatically parses the JSON string in the response 
    };
    return rp(options)
        .then(function(data) {
            reply.view('task', {
                task: data
            });
        })
        .catch(function(err) {
            console.error(err);
        });
}

module.exports = tasks;
