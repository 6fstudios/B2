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
    handler: sprints.getCurrentSprintTasks
}, {
    method: 'GET',
    path: '/sprints',
    handler: sprints.get
}, {
    method: 'GET',
    path: '/sprints/{sprintId}',
    handler: sprints.getSprintTasks
}, {
    method: 'GET',
    path: '/sprints/{sprintId}/stories/{id}',
    handler: stories.getStoryTasks
}, {
    method: 'GET',
    path: '/tasks/{taskId}',
    handler: tasks.view
}, {
    method: 'POST',
    path: '/tasks/{taskId}',
    handler: tasks.updateTask
}]
