
module.exports = logger => {

  /**
   * Uncaught exceptions
   **/
  process.removeAllListeners('uncaughtException');
  process.on('uncaughtException', logger);

  /**
   * Unhandled promise rejection
   **/
  process.on('unhandledRejection', logger);
};
