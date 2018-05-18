const express = require('express');
const path = require('path');

const app = express();

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));


app.use(function (req, res, next) {
  if (req.header('x-forwarded-proto') !== 'https') {
    console.log('https://' + req.header('host')+ req.url);
    res.redirect('https://' + req.header('host') + req.url);
  } else {
    next();
  }
});
// node redirect
app.get('*', function (req, res) {
  console.log('redirect ');
  res.sendFile(path.join(__dirname, 'dist/index.html'));

});

// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);
