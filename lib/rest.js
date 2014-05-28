
// Get a named logger so we can post messages in the log
var log = require('oae-logger').logger('oae-tasklist-rest');

// Import the core OAE utility that contains the Express servers on which we can bind routes
var OAE = require('oae-util/lib/oae');

/**
 * Handle a "get" request to the path /api/tasklist/test that will log an entry indicating we have
 * successfully bound a web route.
 */
OAE.tenantRouter.on('get', '/api/tasklist/test', function(req, res) {

    // The `ctx` ("context") object attached to the request is added in a request processor (i.e.,
    // "middleware") that tells us which tenant on which the request was made, the user who is
    // authenticated to the request (if any). This context is used when invoking request to the APIs
    // in all the modules in the system
    var ctx = req.ctx;

    // Gets the Tenant object that represents the tenant on which the request was made
    var tenant = ctx.tenant();

    // Gets the User object of the user in the request. If the request is anonymous, the user will
    // be `null`
    var user = ctx.user();

    // Send a simple response that indicates the request was successful, using the Express Response
    // object
    res.send({
        'tenant': tenant,
        'user': user
    });
});
