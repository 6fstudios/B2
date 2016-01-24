var hapi = require('hapi');
var rp = require('request-promise');
var config = require('../config');
var stories = {};

stories.getStoryTasks = function(request, reply) {
    var options = {
        uri: config.apiUrl + '/tasks',
        qs: {
            format: 'json',
            where: '(userstory.id eq ' + request.params.id + ')',
            take: 500,
            include: '[Name, Owner, Iteration, Iteration[StartDate], CreateDate, UserStory]'
        },
        headers: {
            'Authorization': config.token
        },
        json: true // Automatically parses the JSON string in the response 
    };
    return rp(options)
        .then(function(data) {
            reply.view('task-list', {
                tasks: data.Items
            });
        })
        .catch(function(err) {
            console.error(err);
        });
}

module.exports = stories;
