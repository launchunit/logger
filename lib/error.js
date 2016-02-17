
'use strict';

/**
 * Module dependencies.
 * @private
 */
const _ = require('lodash'),
  stackTrace = require('stack-trace');


const MAX_TRACE = 6;
const CWD_REGEX = new RegExp(process.cwd(), 'ig');


module.exports = err => {

  if (err instanceof Error) {

    err = {
      message: (err && err.message) || err,
      stacktrace: {
        frames: stackTrace.parse(err)
      }
    };

    if (err.stacktrace.frames.length) {

      err.stacktrace.frames.length = Math.min(MAX_TRACE,
                              err.stacktrace.frames.length);

      // Rename Things for Sentry
      err.stacktrace.frames = _.map(err.stacktrace.frames, i => {
        return {
          filename: i.fileName.replace(CWD_REGEX, ''),
          function: i.functionName,
          lineno: i.lineNumber,
          colno: i.columnNumber
        };
      });
    }

    // Memory stats - maybe app pooped
    // trace.memory = process.memoryUsage();
    // trace.memory.heapTotal = prettyBytes(trace.memory.heapTotal);
    // trace.memory.heapUsed = prettyBytes(trace.memory.heapUsed);
    // trace.memory.rss = prettyBytes(trace.memory.rss);
  }

  return err;
};
