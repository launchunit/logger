
'use strict';

/**
 * Module dependencies.
 * @private
 */
const errorLogger = require('./error'),
  mongodbLogger = require('./mongodb'),
  stringify  = require('json-stringify-safe'),
  eyes = require('eyes');


/**
 * Constants
 */
const INSPECTOR_LEVELS = {
  debug: eyes.inspector({ styles: { string: 'yellow' } }),
  info: eyes.inspector({ styles: { string: 'cyan' } }),
  error: eyes.inspector({ styles: { string: 'red' } })
};


module.exports = (opts, level, sentryType) => {

  // Define Object Preprocessor
  var objectPreprocessor = (err) => err;

  if (level === 'error') {
    objectPreprocessor = errorLogger;
  } else if (level === 'mongodb') {
    objectPreprocessor = mongodbLogger;
  }


  // Sentry Logger
  if (opts.Sentry) {

    return function() {

      var o = {}, k, len;

      for (k=0, len=arguments.length; k<len; k++) {

        if (typeof arguments[k] === 'object') {
          o[k] = objectPreprocessor(arguments[k]);
        }

        else {
          o[k] = arguments[k];
        }
      }

      // If Only 1 Argument
      if (Object.keys(o).length === 1) {
        if (o[0].stacktrace) o = o[0];
        else o = { message: o[0] }
      }
      else { o = { message: stringify(o) } }

      // Make HTTP Request To Rollbar
      opts.Sentry(o, level, sentryType);
    };
  }


  // Stringify'd for Heroku, etc.
  else if (opts.stringify) {

    return function() {

      var Msg = (level + ': '),
        k, len;

      for (k=0, len=arguments.length; k<len; k++) {

        Msg += typeof arguments[k] === 'object'
          ? (stringify(objectPreprocessor(arguments[k])) + ' ')
          : (arguments[k] + ' ');
      }

      process.stdout.write(Msg + '\n');
    };
  }

  // Development Logger
  else {

    return function() {

      var strBuff = [], k, len;

      for (k=0, len=arguments.length; k<len; k++) {

        if (typeof arguments[k] === 'object') {

          if (strBuff.length) {
            INSPECTOR_LEVELS[level](strBuff.join(' '), level);
            strBuff = []; // Empty out string
          }

          INSPECTOR_LEVELS[level](objectPreprocessor(arguments[k]), level);
        }

        else {
          strBuff.push(arguments[k]);
        }
      }

      // Print Out
      if (strBuff.length) {
        INSPECTOR_LEVELS[level](strBuff.join(' '), level);
      }

    };
  }

};
