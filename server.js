const express = require('express');
const path = require('path');
const forceSSL = require('express-force-ssl');

const app = express();
// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS
app.set('forceSSLOptions', {
  enable301Redirects: true,
  trustXFPHeader: false,
  httpsPort: 443,
  sslRequiredMessage: 'SSL Required.'
});
app.use(forceSSL());

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));


// node redirect
app.get('*', function(req, res){
  console.log('redirect ');
  res.sendFile(path.join(__dirname, 'dist/index.html'));

});

// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);
