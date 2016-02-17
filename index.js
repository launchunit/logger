
'use strict';

/**
 * Module dependencies.
 * @private
 */
const Provider = require('./lib/provider');


/**
 * Logger Levels
 */
const LEVELS = {
  debug: 1,
  info: 2,
  error: 3
};


/**
 * @params {String} opts.level [debug|info|error]
 * @params {String} opts.sentryDSN
 * @params {String} opts.sentryEnv (Defualt=[production])
 * @params {Boolean} opts.stringify (Default=false)
 *                    // Stringify'd for Heroku, etc.
**/
module.exports = opts => {

  opts = Object.assign({
    level: 'debug',
    stringify: false,
    sentryDSN: false,
    sentryEnv: 'production'
  }, opts);


  /**
   * Global Logger
   */
  global.logger = null;
  global.logger = {};


  // Enable Sentry
  if (opts.sentryDSN) {
    opts.Sentry = require('./lib/sentry')(opts);
  }


  // Build the Logger
  for (var i in LEVELS) {

    logger[i] = (LEVELS[i] >= LEVELS[opts.level])
      ? Provider(opts, String(i))
      : function(){};
  }

  logger['request'] = Provider(opts, 'info', 'request');
  logger['mongodb'] = Provider(opts, 'info', 'mongodb');


  // Request Logger
  logger.request = require('./lib/request')(logger.request);

  // Exception Logger
  require('./lib/exception')(logger.error);
};
