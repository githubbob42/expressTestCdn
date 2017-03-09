var express = require('express')
var compression = require('compression')
var bodyParser = require('body-parser');
var directory = require('serve-index');
var authenticate = require('./authenticate');
var sessionCookie = require('./session-cookie');
var symlink = require('./express-symlink');

var verifySession = require('./verify-session');
var checkFile = require('./check-file');
var cdn = require('./cdn');
var race = require('express-race');
var AuthToken = require('./sforce/auth/token.js');

// var router = require('./router');

var app = express();

// compress all requests
app.use(compression());

app.use('/files', sessionCookie());
app.use('/files', authenticate());
app.use('/files', symlink('files'));
app.use('/files', directory('files'));
app.use('/files', express.static('files'));

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  if (req.is('text/*')) {
    req.text = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk){ req.text += chunk });
    req.on('end', next);
  } else {
    next();
  }
});

//app.use(express.static(__dirname, '/tib'));

app.set('port', (process.env.PORT || 5000))

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    res.end(JSON.stringify(req.body, null, 2))
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
})

// router.initialize(app);

var CDN_RESOURCES = '/:sessionid/:sfnamespace/:prod(prod)?/:app/:version/*';
app.use(CDN_RESOURCES, checkFile());
app.use(CDN_RESOURCES, verifySession());
app.use(CDN_RESOURCES, race(cdn(process.env.S3_BUCKET_BACKOFFICE || 'fxbackoffice'), cdn(process.env.S3_BUCKET_BACKOFFICE_ALT || 'fxbackoffice-ca')));
// app.use(CDN_RESOURCES, race(cdn(process.env.S3_BUCKET_BACKOFFICE || 'fxbackoffice')));

//https://cdn.fieldfx.com/00Di0000000el2B!AQUAQG1EifDNbsG1y.CUWx_nlfJqIo7672ybtk_j8p3UE.cN5iMjsqoPQvJ4ZSRkPPmAitCSJVxY0OPSSGIFrWg.1SlJ1Bh4/FX5__/prod/tib/LATEST/mainjs.js?orgid=00Di0000000el2BEAQ&orgname=Liquid Frameworks (Partner Main)&loginname=broth@mobileteam.com&userid=005i0000002XxFVAA0&username=Bob Roth (MT Console)
//https://cdn.fieldfx.com/00Di0000000el2B!AQUAQG1EifDNbsG1y.CUWx_nlfJqIo7672ybtk_j8p3UE.cN5iMjsqoPQvJ4ZSRkPPmAitCSJVxY0OPSSGIFrWg.1SlJ1Bh4/FX5__/prod/tib/LATEST/mainjs.js?orgid=00Di0000000el2BEAQ&orgname=Liquid Frameworks (Partner Main)&loginname=broth@mobileteam.com&userid=005i0000002XxFVAA0&username=Bob Roth (MT Console)


// error handling middleware needs to be loaded after the loading the routes (as of express v4)
app.use(function logErrors(err, req, res, next) {
  var oauth = req.session && req.session.oauth;
  // console.logError(err, oauth);
  var token = new AuthToken(oauth);

  console.error(err.name + ' -orgId: ' + token.orgId + ' -userId: ' + token.userId + ' -errorDetails: ' + err.message);
  next(err);
});

app.use(function errorHandler(err, req, res, next) {
  if(err && err.errorCode === 'INVALID_SESSION_ID') {
    return res.status(401).send('Not Authorized');
  }
  /* jshint unused:false*/
  res.status(err && err.statusCode || 500).json(err);
});

// app.use(function errorHandler(err, req, res, next) {
//   console.log('\033[0;31m', '>>>> error handler ', err , '\033[0m' );
//   console.log('\033[0;33m', '>>>> stack ', err.stack , '\033[0m' );
//   console.log('\033[0;31m', '>>>> message ', err.name , '\033[0m' );
//   console.log('\033[0;31m', '>>>> statusCode ', err.statusCode , '\033[0m' );
//   console.log('\033[0;31m', '>>>> errorCode ', err.errorCode , '\033[0m' );
//   console.log('\033[0;31m', '>>>> status ', err.status , '\033[0m' );
//   // console.error(err.stack)

//   console.log('\033[0;32m', '>>>> CAUGHT ', err.name , '\033[0m' );

//   // switch (err.status) {
//     // case 401:
//   switch (err.name) {
//     // case errors.INVALID_SESSION_ID.name:
//       // res.status(err.statusCode).send(err.error); //[{"message":"Session expired or invalid","errorCode":"INVALID_SESSION_ID"}]
//       // res.status(err.status || 401).send('Session expired or invalid');
//       // break;
//     case 'TimeoutError':
//       // res.status(err.statusCode).send(err.error); //[{"message":"Session expired or invalid","errorCode":"INVALID_SESSION_ID"}]
//       if (err.code === 'CredentialsError') {
//         res.status(err.status || 401).send(err.message);
//       }
//       else {
//         res.status(err.status || 500).send(err.message);
//       }
//       break;
//     default:
//       console.log('\033[0;31m', '>>>> Unknown Error:', err , '\033[0m' );
//       res.status(500).json(err); //.send('Something broke!')
//       break;
//   }

// });
