var url = require('url');

function splitToken( oauth ) {
  var url_parts = url.parse( oauth.id ),
    keys = url_parts.pathname.split('/');
  return keys.slice( keys.length - 2 );
}

module.exports = function(oauth) {
  return {
    get userId () {
      return oauth ? splitToken( oauth )[ 1 ] : null;
    },
    get orgId () {
      return oauth ? splitToken( oauth )[ 0 ] : null;
    }
  };
};