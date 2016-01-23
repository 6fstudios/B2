var tasks = require('./controllers/tasks-controller');
var stories = require('./controllers/stories-controller');
var sprints = require('./controllers/sprints-controller');

module.exports = [{
    method: 'GET',
    path: '/style.css',
    handler: function(request, reply) {
        reply.file('./public/style.css');
    }
}, {
    method: 'GET',
    path: '/',
    handler: sprints.getCurrent
}, {
    method: 'GET',
    path: '/sprints',
    handler: sprints.get
}, {
    method: 'GET',
    path: '/sprints/{id}',
    handler: function(request, reply) {
        reply.redirect('/sprints/' + request.params.id + '/stories');
    }
}, {
    method: 'GET',
    path: '/sprints/{sprintId}/stories',
    handler: stories.get
}, {
    method: 'GET',
    path: '/sprints/{sprintId}/stories/{id}',
    handler: stories.getStoryTasks
}, {
    method: 'GET',
    path: '/tasks/{taskId}',
    handler: tasks.view
}, {
    method: 'GET',
    path: '/sprints/{sprintId}/tasks',
    handler: sprints.getSprintTasks
}, {
    method: 'POST',
    path: '/tasks/{taskId}',
    handler: tasks.updateTask
}]
