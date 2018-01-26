// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
// app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/:timestamp?", function (request, response) {
  var timestamp = request.params.timestamp
  var resData = {
    unix: null,
    natural: null
  };
  if (!timestamp) {
    response.json(resData);
  } else {
    const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (isNaN(parseInt(timestamp))) {
      // is a string
      var date = new Date(timestamp);
      resData.natural = months[date.getUTCMonth()] + " " + date.getUTCDate() + ", " + date.getUTCFullYear();
      resData.unix = Math.floor(date.getTime() / 1000);
    } else {
      // is a number (expect unix time)
      var date = new Date(timestamp * 1000);
      resData.natural = months[date.getUTCMonth()] + " " + date.getUTCDate() + ", " + date.getUTCFullYear();
      resData.unix = timestamp;
    }
    response.json(resData);
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
