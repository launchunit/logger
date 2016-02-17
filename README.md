# logger

All purpose global logger for NodeJs apps.

1. Makes errors pretty & mostly readable - gives error, file, line number etc. Uses [stack-trace module](https://github.com/felixge/node-stack-trace)
2. Handles uncaughtException & unhandledRejection
3. Logger object = `logger.debug`, `logger.info`, `logger.error`
4. Includes ExpressJs request logger middleware `logger.request`
5. Includes mongodb logger `logger.mongodb`. Function that can be used as a mongoDB logger with the [node-mongodb-native module](https://github.com/mongodb/node-mongodb-native)
6. Logs to [Sentry](https://getsentry.com/)
7. Adds custom tag/env & git repo details when logging to Sentry - id, branch
8. `stringify` mode to Heroku, etc.

----

## Usage

```js
/**
 * @params {String} opts.level [debug|info|error]
 * @params {String} opts.sentryDSN
 * @params {String} opts.sentryEnv (Defualt=[production])
 * @params {Boolean} opts.stringify (Default=false)
 *                    // Stringify'd for Heroku, etc.
**/
const logger = require('./')({
  level: 'debug',
});

console.log(logger);

// Exmaples
logger.info('Some Log Message');
logger.info({ a: 1, b: 2 });
logger.info('Some Log Message', 'Some Other Message');
logger.info('Some Log Message', { a: 1, b: 2 });
logger.info('Some Log Message', { a: 1, b: 2 }, 'Some other message');

// Request Logging w/ Express
expressApp.use(logger.request);

// Use MongoDb Logger
// http://mongodb.github.io/node-mongodb-native/2.1/api/node_modules_mongodb-core_lib_connection_logger.js.html
const Logger = require('mongodb').Logger;
Logger.setCurrentLogger = logger.mongodb;
```


#### Run Tests

```bash
$ npm test

# OR for continuous testing
$ nodemon --exec "npm test"
```

