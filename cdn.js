// var fs = require('fs');
var path = require('path');
var AWS = require('aws-sdk');
var mime = require('mime');

module.exports = function(s3Bucket) {
  return function (req, res, next) {

    var s3 = new AWS.S3();
    // var s3Bucket = process.env.S3_BUCKET_BACKOFFICE;

    var app = req.params.app;
    var version = req.params.version;
    var file = req.params[0];

    var header = {
        'x-timestamp': Date.now(),
        'x-sent': true,
        'Content-Type': mime.lookup(file)
    };

    if (version == 'LATEST' || version == 'BETA') {
        version = '' + process.env[version + '_' + app.toUpperCase()];
        if (version == 'undefined') {
            console.log('GETFILE: bad version', JSON.stringify({query: req.query, params: req.params}));
            // res.status(500).send('bad version');
            next(new Error("bad version"));
            return;
        }

        header = {
            'x-timestamp': Date.now(),
            'x-sent': true,
            // Disable caching for content files
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'Content-Type': mime.lookup(file)
        };
    }

    var filepath = path.join(app, '/', version, '/', file);

    console.log('Incoming request: ' + filepath );
    console.log('S3 request KEY: ' + filepath + ' BUCKET: ' + s3Bucket);

    s3.headObject({Bucket: s3Bucket, Key: filepath}, function(err, data) {
      if (err) {
        console.log('S3 Bucket/Key not found. KEY: ' + filepath + ' BUCKET: ' + s3Bucket);
        // console.log('!!! err', err); // an error occurred
        // console.log('!!! err.stack', err.stack); // an error occurred
        // res.status(404).send('bucket/key not found');
        next(err);
        return;
      }

      res.set(header);

      // var fileStream = s3
      // s3.getObject({Bucket: s3Bucket, Key: filepath})
      //   // .on('httpError', function (error, response) {
      //   //     console.log('S3 Bucket/Key not found. KEY: ' + filepath + ' BUCKET: ' + s3Bucket);
      //   //     console.log(err, err.stack); // an error occurred
      //   //     res.status(404).send('bucket/key not found');
      //   //     // res.end();
      //   //  })
      //   .on('httpData', function (chunk) { res.write(chunk); })
      //   .on('httpDone', function () { res.end(); })
      //   .send();
      s3.getObject({Bucket: s3Bucket, Key: filepath})
       .createReadStream()
       .on('error', function(err) {
console.log('\033[0;32m', '>>>> S3 createReadStream ', err , '\033[0m' );
         // console.log('S3 createReadStream ', err);
         next(err);
       })
       .pipe(res);

    });
  };
};