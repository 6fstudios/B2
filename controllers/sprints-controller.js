var hapi = require('hapi');
var rp = require('request-promise');
var config = require('config');
var sprints = {};

sprints.get = function(request, reply) {
    var options = {
        uri: config.apiUrl + '/iterations',
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
            reply.view('sprints', {
                sprints: data.Items
            });
        })
        .catch(function(err) {
            console.error(err);
        });
}

sprints.getCurrent = function(request, reply) {
    var options = {
        uri: config.apiUrl + '/iterations',
        qs: {
            format: 'json',
            where: '(IsCurrent eq "true")',
            include: '[Id]'
        },
        headers: {
            'Authorization': config.token
        },
        json: true // Automatically parses the JSON string in the response 
    };
    return rp(options)
        .then(function(data) {
            reply.redirect('/sprints/' + data.Items[0].Id + '/stories');
        })
        .catch(function(err) {
            console.error(err);
        });
}

module.exports = sprints;
