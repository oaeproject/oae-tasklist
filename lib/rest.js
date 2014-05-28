
// Get a named logger so we can post messages in the log
var log = require('oae-logger').logger('oae-tasklist-rest');

// Import the core OAE utility that contains the Express servers on which we can bind routes
var OAE = require('oae-util/lib/oae');

// Import the API component to get the task create and listing functionality
var TasklistAPI = require('./api');

/**
 * Handle a "get" request that gets the current user's tasks
 */
OAE.tenantRouter.on('get', '/api/tasklist', function(req, res) {
    // The `ctx` ("context") object attached to the request is added in a request processor (i.e.,
    // "middleware") that tells us which tenant on which the request was made, the user who is
    // authenticated to the request (if any). This context is used when invoking request to the APIs
    // in all the modules in the system
    var ctx = req.ctx;

    // Call the API to get the list of tasks for the current user in context
    TasklistAPI.listTasks(ctx, function(err, tasks) {
        if (err) {
            // If there was any error fetching tasks, respond with the error code and message
            res.send(err.code, err.msg);
            return;
        }

        // We successfully got the list of tasks, send it to the client
        res.send(tasks);
    });
});

/**
 * Handle a "post" request that adds a task to the current user's task list
 */
OAE.tenantRouter.on('post', '/api/tasklist', function(req, res) {
    // The `ctx` ("context") object attached to the request is added in a request processor (i.e.,
    // "middleware") that tells us which tenant on which the request was made, the user who is
    // authenticated to the request (if any). This context is used when invoking request to the APIs
    // in all the modules in the system
    var ctx = req.ctx;

    // Express makes request data for POST requests available on the "body" object of the request
    var displayName = req.body.displayName;
    var description = req.body.description;

    // Call the API to add a task to the task list of the user in context
    TasklistAPI.addTask(ctx, displayName, description, function(err, task) {
        if (err) {
            // If there was any error adding the task, respond with the error code and message
            res.send(err.code, err.msg);
            return;
        }

        // We successfully created the task, send its model to the client
        res.send(task);
    });
});

/**
 * Handle a "delete" request that deletes a task from the current user's task list
 */
OAE.tenantRouter.on('delete', '/api/tasklist/:created', function(req, res) {
    // The `ctx` ("context") object attached to the request is added in a request processor (i.e.,
    // "middleware") that tells us which tenant on which the request was made, the user who is
    // authenticated to the request (if any). This context is used when invoking request to the APIs
    // in all the modules in the system
    var ctx = req.ctx;

    // Since the "created" property is coming from path parameter ":created", we access it from the
    // "params" object of the Express Request
    var created = parseInt(req.params.created, 10);

    // Call the API to delete the task from the task list of the user in context
    TasklistAPI.deleteTask(ctx, created, function(err) {
        if (err) {
            // If there was any error deleting the task, respond with the error code and message
            res.send(err.code, err.msg);
            return;
        }

        // We successfully deleted the task, reply with a 200 HTTP status code and no body
        res.send();
    });
});
