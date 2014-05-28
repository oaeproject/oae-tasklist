
var taskStore = {};

/**
 * Add a task to the current user's task list
 *
 * @param  {Context}    ctx             The context of the current request
 * @param  {String}     displayName     The name to represent the task in brief listings
 * @param  {String}     description     The full description / instructions of the task
 * @param  {Function}   callback        Invoked when the process completes
 * @param  {Object}     callback.err    An error that occurred, if any
 * @param  {Object}     callback.task   The task that was added to the user's task list
 */
module.exports.addTask = function(ctx, displayName, description, callback) {
    // Get the user of the current request
    var user = ctx.user();

    // Anonymous users cannot create tasks
    if (!ctx.user()) {
        return callback({'code': 401, 'msg': 'Anonymous users cannot create tasks'});
    }

    // Ensure the task store contains a task list for the current user
    if (!taskStore[user.id]) {
        taskStore[user.id] = [];
    }

    // Push the new task onto the current user's task list
    var task = {
        'displayName': displayName,
        'description': description
    };
    taskStore[user.id].push(task);

    // Respond with the created task
    return callback(null, task);
};

/**
 * Get the current user's list of tasks
 *
 * @param  {Context}    ctx                 The context of the current request
 * @param  {Function}   callback            Invoked when the process completes
 * @param  {Object}     callback.err        An error that occurred, if any
 * @param  {Object}     callback.tasksInfo  An object containing the list of tasks owned by the current user
 */
module.exports.listTasks = function(ctx, callback) {
    // Get the user of the current request
    var user = ctx.user();

    // Anonymous users don't have tasks
    if (!ctx.user()) {
        return callback({'code': 401, 'msg': 'Anonymous users cannot list their tasks'});
    }

    var tasks = taskStore[user.id];

    // If the current user has no tasks, respond with a 404 error
    if (!tasks) {
        return callback({'code': 404, 'msg': 'User does not have a task list'});
    }

    // Respond with the user's task list
    return callback(null, {'tasks': tasks});
};
