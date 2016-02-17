
'use strict';

/**
 * Module dependencies.
 * @private
 */
const onFinished = require('on-finished');


module.exports = logger => {

  return (req, res, next) => {

    req._logger_start = process.hrtime();

    // On Response End Listener
    onFinished(res, () => {

      var timeDiff = process.hrtime(req._logger_start);
      timeDiff = ((timeDiff[0]  * 1e3) + (timeDiff[1] * 1e-6)).toFixed(0)

      // Log It
      logger(`${req.method} ${req.originalUrl || req.url} ${res.statusCode || ''} - ${timeDiff}ms`);
    });

    return next();
  };

};
