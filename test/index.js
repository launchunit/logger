
const test = require('ava');
const Logger = require('../');


test.serial('Debug Log Level', t => {

  // Setup the global logger
  Logger({
    level: 'debug'
  });

  t.ok(typeof logger === 'object');
  t.ok(logger.debug);
  t.ok(logger.info);
  t.ok(logger.error);
  t.ok(typeof logger.request === 'function');

  logger.debug('Hello from debug');
  logger.info('Hello from info');
  logger.error('Hello from error');
});


test.serial('Debug Log Level with Multiple Data Types', t => {

  // Setup the global logger
  Logger({
    level: 'debug'
  });

  t.ok(typeof logger === 'object');
  t.ok(logger.debug);
  t.ok(logger.info);
  t.ok(logger.error);
  t.ok(typeof logger.request === 'function');

  logger.debug('Hello from debug',
               { a: 1, b: 2 },
               [1,2,3]);
  logger.info('Hello from info');
  logger.error('Hello from error');
});


test.serial('Info Log Level', t => {

  // Setup the global logger
  Logger({
    level: 'info'
  });

  t.ok(typeof logger === 'object');
  t.ok(logger.debug);
  t.ok(logger.info);
  t.ok(logger.error);
  t.ok(typeof logger.request === 'function');

  logger.debug('Hello from debug',
               { a: 1, b: 2 },
               [1,2,3]);
  logger.info('Hello from info');
  logger.error('Hello from error');
});


test.serial('Error Log Level', t => {

  // Setup the global logger
  Logger({
    level: 'error'
  });

  t.ok(typeof logger === 'object');
  t.ok(logger.debug);
  t.ok(logger.info);
  t.ok(logger.error);
  t.ok(typeof logger.request === 'function');

  logger.debug('Hello from debug',
               { a: 1, b: 2 },
               [1,2,3]);
  logger.info('Hello from info');
  logger.error('Hello from error');
});


test.serial('Error Log Level w/ Error Instance', t => {

  // Setup the global logger
  Logger({
    level: 'error'
  });

  t.ok(typeof logger === 'object');
  t.ok(logger.debug);
  t.ok(logger.info);
  t.ok(logger.error);
  t.ok(typeof logger.request === 'function');

  logger.debug('Hello from debug',
               { a: 1, b: 2 },
               [1,2,3]);
  logger.info('Hello from info');
  logger.error(new Error('Hello from error'));
});


test.serial('Debug Log Level w/ stringify', t => {

  // Setup the global logger
  Logger({
    level: 'debug',
    stringify: true
  });

  t.ok(typeof logger === 'object');
  t.ok(logger.debug);
  t.ok(logger.info);
  t.ok(logger.error);
  t.ok(typeof logger.request === 'function');

  logger.debug('Hello from debug',
               { a: 1, b: 2 },
               [1,2,3]);
  logger.info('Hello from info');
  logger.error('Hello from error');
});


test.serial('Error Log Level w/ stringify', t => {

  // Setup the global logger
  Logger({
    level: 'error',
    stringify: true
  });

  t.ok(typeof logger === 'object');
  t.ok(logger.debug);
  t.ok(logger.info);
  t.ok(logger.error);
  t.ok(typeof logger.request === 'function');

  logger.debug('Hello from debug',
               { a: 1, b: 2 },
               [1,2,3]);
  logger.info('Hello from info');
  logger.error('Hello from error');
});


test.serial('Info Log Level w/ Error Instance', t => {

  // Setup the global logger
  Logger({
    level: 'info',
    stringify: true
  });

  t.ok(typeof logger === 'object');
  t.ok(logger.debug);
  t.ok(logger.info);
  t.ok(logger.error);
  t.ok(typeof logger.request === 'function');

  logger.debug('Hello from debug',
               { a: 1, b: 2 },
               [1,2,3]);
  logger.info('Hello from info');
  logger.error(new Error('Hello from error'));
});


test.serial.cb('Info Log Level w/ Sentry', t => {

  // Setup the global logger
  Logger({
    level: 'info',
    sentryDSN: process.env.SENTRY
  });

  t.ok(typeof logger === 'object');
  t.ok(logger.debug);
  t.ok(logger.info);
  t.ok(logger.error);
  t.ok(typeof logger.request === 'function');

  logger.debug('Hello from debug',
               { a: 1, b: 2 },
               [1,2,3]);
  logger.info('Hello from info');
  return logger.error('Hello from error');
});


test.serial.cb('Info Log Level w/ Error Instance', t => {

  // Setup the global logger
  Logger({
    level: 'info',
    sentryDSN: process.env.SENTRY
  });

  t.ok(typeof logger === 'object');
  t.ok(logger.debug);
  t.ok(logger.info);
  t.ok(logger.error);
  t.ok(typeof logger.request === 'function');

  logger.info('Hello from info multple',
               { a: 1, b: 2 },
               [1,2,3]);
  logger.error(new Error('Hello from superman'));
});


test.serial('Mongodb Log', t => {

  // Setup the global logger
  Logger({
    level: 'info',
  });

  t.ok(typeof logger === 'object');
  t.ok(logger.debug);
  t.ok(logger.info);
  t.ok(logger.error);
  t.ok(typeof logger.request === 'function');

  logger.mongodb('Mongodb some log example');
});


test.serial.cb('Mongodb Log w/ Sentry', t => {

  // Setup the global logger
  Logger({
    level: 'info',
    sentryDSN: process.env.SENTRY
  });

  t.ok(typeof logger === 'object');
  t.ok(logger.debug);
  t.ok(logger.info);
  t.ok(logger.error);
  t.ok(typeof logger.request === 'function');

  logger.mongodb('Mongodb some log example');
});

