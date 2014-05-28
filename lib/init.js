
// Get a named logger so we can post messages in the log
var log = require('oae-logger').logger('oae-tasklist-init');

// Import the Cassandra storage API
var Cassandra = require('oae-util/lib/cassandra');

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

    // When the column family is created, it will invoke the callback we gave it, which is our
    // complete initialization callback. So when the column family finishes being created, the
    // initialization process will continue to the next module
    Cassandra.createColumnFamily('Tasks', 'CREATE TABLE "Tasks" ("userId" text, "displayName" text, "description" text, "created" bigint, PRIMARY KEY("userId", "created"))', callback);
};
