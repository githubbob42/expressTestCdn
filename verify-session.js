var request = require('request-promise');
// var errors = require('./errors')();

module.exports = function() {
  return function (req, res, next) {

    if (req.params.sessionid == 0) return next('route');
    if (req.params.version == 0) return next('route');
    if (req.params.app == 0) return next('route');
    if (!req.params.sfnamespace) return next('route');

    var salesForceNamespace = req.params.sfnamespace.replace('__', '');
    salesForceNamespace = (salesForceNamespace == '') ? '_DEV_' : salesForceNamespace;

    var sessionid = req.params.sessionid;
    var app = req.params.app;

    var referer = req.headers["referer"] || 'pscnow.force.com/community/'; // TODO: REMOVE ME!!!!
    if (referer == null) {
        var out = 'bad referer: ' + referer;
        res.status(404) // HTTP status 404: NotFound
            .send(out);

        console.log('GETFILE: bad referer: ' + referer, JSON.stringify({query: req.query, params: req.params}));

        return;
    }


    function endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }


    var isSandbox = false;
    var isCommunity = false;
    var communitypath = '';
    var parts = referer.split('.');
    var salesForceServer = '';
    if (parts[1] == 'force' && parts[2].indexOf('com') > -1) {
        salesForceServer = parts[0];
        isCommunity = true;
        communitypath = referer.substring(0, referer.lastIndexOf('/')+1);
        communitypath = communitypath.replace('/apex/','/');
        console.log('GETFILE: communitypath: ' + communitypath);
    } else if (parts[1] == 'visual' && parts[2] == 'force') {
        salesForceServer = parts[0];
    } else if (parts[2] == 'visual' && parts[3] == 'force') {
        isSandbox = (salesForceNamespace != '_DEV_');
        salesForceServer = parts[1];
    } else {
        var url = referer.split('/');
        console.log('testing for community user: ' + url[2]);
        if (endsWith(url[2], 'force.com')) {
            console.log('testing for community user: endswith force.com');
            salesForceServer = parts[0];
            isCommunity = true;
            communitypath = referer.substring(0, referer.lastIndexOf('/')+1);
            communitypath = communitypath.replace('/apex/','/');
            console.log('GETFILE: communitypath: ' + communitypath);
        }
    }

    if (salesForceServer == '') {
        if ((referer.indexOf('heroku') > -1) || (referer.indexOf('fieldfx.com') > -1)) {
            console.log('getting css referenced file: ' + req.params[0]);
            // getFile(req, res, app);
            return next();
        } else {
            console.log('GETFILE: bad referer: ' + referer, JSON.stringify({query: req.query, params: req.params}));
            var out = 'bad referer: ' + referer;
            return res.status(404).send(out); // HTTP status 404: NotFound
        }
    }

// function verifySession(sessionid, salesForceServer, salesForceNamespace, isSandbox, isCommunity, communitypath) {
    var url = '';
    if (isCommunity) {
        if (salesForceNamespace === '_DEV_') {
            url = communitypath + 'services/apexrest/ping?namespace=_DEV_';
        } else {
            url = communitypath + 'services/apexrest/' + salesForceNamespace + '/ping?namespace=' + salesForceNamespace;
        }
        url = 'https://' + salesForceServer + '.salesforce.com/services/apexrest';
        url += (isSandbox) ? '/' + salesForceNamespace : '';
        url += '/ping?namespace=' + salesForceNamespace;
    }

    console.log('GETFILE: verifySession URL: ' + url);

    var options = {
      url: url,
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'
      },
      auth: {
        'bearer': sessionid
      }
    };

    // return request.get(options);
    request
      .get(options)
      // .catch(console.error)
      .catch(function(err) {
console.log('\033[0;32m', '>>>> BOOOM INVALID_SESSION_ID ', err  , '\033[0m' );
        // res.status(401).send('INVALID_SESSION_ID');
        next(err);
      })
      .then(function(results) {
        if (results != null) {
console.log('\033[0;32m', '>>>> WOOHOO call getFile/next() '  , '\033[0m' );
          // getFile(req, res, app);
          next();
//         } else {
// console.log('\033[0;32m', '>>>>>>>>>>>>>>>>>>>  '  , '\033[0m' );
//           console.log('GETFILE: bad session id', JSON.stringify({query: req.query, params: req.params}));
// console.log(' >>>> err ', err);
// console.log('\033[0;32m', '>>>>>>>>>>>>>>>>>>>  '  , '\033[0m' );
//           // res.status(500).send('bad session id');
//           next();
        }
      });
  };
};
