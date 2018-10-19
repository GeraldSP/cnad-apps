var express = require('express');
var corser = require("corser");
var path = require('path');
var app = express();
var request = require('request');
var apiUrl = process.env.CNAD_API_URL;

app.use(corser.create());
app.use(express.static(__dirname + '/dist'));
app.options("*", function (req, res) {
  // CORS
  res.writeHead(204);
  res.end();
});

app.all('/api/*', (req, res, next) => {
  if (!apiUrl){
    console.log("ENV VARIABLE \"CNAD_API_URL\" IS NOT DEFINED!");
    res.status(500).send({ "error"  : "Please define the variable CNAD_API_URL on the server container"});
  }else{
    console.log("Env variable \"CNAD_API_URL\" defined! = ", apiUrl );
    let url = apiUrl + req.url.replace('/api', '');
    console.log("Forwarding request to endpoint : ", url);
    req.pipe(request(url)).pipe(res);
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Used for App health checking
app.get('/sys/info/ping', function(req, res, next) {
  res.end('"OK"');
});

var port = process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8001;
var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var server = app.listen(port, host, function() {
  console.log("App started at: " + new Date() + " on port: " + port);
});
module.exports = server;
