module.exports = function() {
  return function (req, res, next) {
// console.log('\033[0;32m', '>>>> BEGIN check-file req.headers["referer"]\n', req.headers["referer"]  , '\033[0m' );
// console.log('\033[0;32m', '>>>> BEGIN check-file req.query\n', req.query  , '\033[0m' );
console.log('\033[0;32m', '>>>> BEGIN test req.params\n', req.params  , '\033[0m' );
console.log('\033[0;32m', '>>>> BEGIN test req.params[0]\n', req.params[0]  , '\033[0m' );
    if (req.params.sessionid == 0) return next('route');
    if (req.params.version == 0) return next('route');
    if (req.params.app == 0) return next('route');
    if (!req.params.sfnamespace) return next('route');

    if (!req.params[0]) {
      console.log('GETFILE: filename missing', JSON.stringify({query: req.query, params: req.params}));
      res.status(404).send();
    }
    else {
      // res.send('Congratulations!!!  You made it!!!  Here\'s you file: ' + req.params[0]);
      next();
    }
  };
};
