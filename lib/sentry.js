
'use strict';

/**
 * Module dependencies.
 * @private
 */
const git = require('git-rev-sync'),
  url = require('url'),
  got = require('got'),
  uuid = require('node-uuid'),
  stringify  = require('json-stringify-safe');


function parseDSN(dsn) {

  const parsed = url.parse(dsn),
    response = {
      protocol: parsed.protocol.slice(0, -1),
      key: parsed.auth.split(':')[0],
      secret: parsed.auth.split(':')[1],
      host: parsed.host.split(':')[0]
    };

  const index = parsed.pathname.lastIndexOf('/');
  // response.path = parsed.pathname.substr(0, index + 1);
  response.project_id = parsed.pathname.substr(index + 1);

  return response;
};

function buildHeader(key, secret) {

  const str = `Sentry sentry_version=7, ` +
    `sentry_key=${key}, ` +
    `sentry_secret=${secret}, `+
    `sentry_client=node/4.2, ` +
    `sentry_timestamp=`;

  return new Function('timestamp', 'return "'+ str + '"+timestamp');
};


module.exports = opts => {

  // Parse DSN
  const sentryDSN = parseDSN(opts.sentryDSN);
  delete opts.sentryDSN;

  // Add Tags
  const Tags = {
    env: opts.sentryEnv,
    release: git.long(),
    branch: git.branch()
  };

  const URL = `https://${sentryDSN.host}/api/${sentryDSN.project_id}/store/`;
  const Header = buildHeader(sentryDSN.key, sentryDSN.secret);


  return (message, level, sentryType) => {

    message.event_id = uuid().replace(/-/g, '');
    message.level = level;
    message.tags = Tags;
    message.release = Tags.release;
    if (sentryType) message.tags.type = sentryType;

    got.post(URL, {
      retries: 0,
      headers: {
        'Content-Type': 'application/json',
        'X-Sentry-Auth': Header(Date.now())
      },
      body: stringify(message)
    });

  };
};
