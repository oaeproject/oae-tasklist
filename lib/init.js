
// Get a named logger so we can post messages in the log
var log = require('oae-logger').logger('oae-tasklist-init');

/**
 * Initialize the module on application startup. This is run once during startup and will not
 * be run again during the lifetime of the server. Here you can:
 *
 *  * Initialize module configuration, the `config` object is the full `config.js` configuration
 *  * Initialize Cassandra Tables (data schema)
 *  * Register any integrations in the system such as search and activity entities
 */
module.exports = function(config, callback) {
    log().info('Initializing the oae-tasklist module');

    // The callback function must be called to tell the OAE container that initialization has
    // completed and it is safe to continue initializing other modules
    return callback();
};
