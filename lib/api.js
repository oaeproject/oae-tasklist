
// Import the Cassandra storage API
var Cassandra = require('oae-util/lib/cassandra');

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

    // Create a task object for the user with the current timestamp
    var task = {
        'userId': ctx.user().id,
        'displayName': displayName,
        'description': description,
        'created': Date.now()
    };

    // Persist the task object into Cassandra
    var cql = 'INSERT INTO "Tasks" ("userId", "displayName", "description", "created") VALUES (?, ?, ?, ?)';
    var parameters = [
        task.userId,
        task.displayName,
        task.description,
        task.created
    ];
    Cassandra.runQuery(cql, parameters, function(err) {
        if (err) {
            return callback(err);
        }

        // Respond with the created task
        return callback(null, task);
    });
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

    // Query the tasks from Cassandra
    var cql = 'SELECT * FROM "Tasks" WHERE "userId" = ? ORDER BY "created" DESC';
    var parameters = [ctx.user().id];
    Cassandra.runQuery(cql, parameters, function(err, rows) {
        if (err) {
            return callback(err);
        }

        // Iterate over all rows returned by Cassandra and add the tasks to the tasks array
        var tasks = [];
        rows.forEach(function(row) {
            // A row is a list of columns (userId, displayName, etc...). This utility function will
            // convert that list of columns into an object of key -> value
            var task = Cassandra.rowToHash(row);

            // Add the task to the tasks array
            tasks.push(task);
        });

        // Respond with the user's task list
        return callback(null, {'tasks': tasks});
    });
};
