module.exports = function() {

  function INVALID_SESSION_ID(message) {
    this.name = 'INVALID_SESSION_ID';
    this.message = message || 'Session expired or invalid';
    this.status = 401;
    // this.stack = (new Error()).stack;
  }
  INVALID_SESSION_ID.prototype = Object.create(Error.prototype);
  INVALID_SESSION_ID.prototype.constructor = INVALID_SESSION_ID;

  return {
    INVALID_SESSION_ID: INVALID_SESSION_ID
  }
}