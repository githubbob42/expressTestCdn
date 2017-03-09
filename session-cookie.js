var session = require('client-sessions');

module.exports = function () {
  // session valid for 24 hours
  var DEFAULT_DURATION = 24 * 60 * 60 * 1000;

  return session({
    cookieName: 'session', 
    secret: 'nforce', 
    duration: DEFAULT_DURATION,
    activeDuration: process.env.SESSION_DURATION || DEFAULT_DURATION
  });
};