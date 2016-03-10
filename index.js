/*

var express = require('express');
var app = express();
var path = require("path");
var url = require("url");
var pg = require('pg');
app.set('port', (process.env.PORT || 5000));
app.set("Content-Type", "application/x-www-form-urlencoded");

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname+'/index.html'));
  //response.end('Its Over!'); 
});

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
})
app.get('/:url', function(request, response) {
  (request.url).replace(/(\/)/g, "%2F")
  var dummyVar = typeof(request);
  var dummyVarTest = request.query;
  var dummyVarTestStringified = JSON.stringify(request.url);
  //var preReponseParsed = (request.url).replace(/%2F/g, "/");
  var preReponseParsed = request.url;
  response.send(dummyVar+'<br/> dummyVarTest--->'+dummyVarTest+'<br/> dummyVarTestStringified--->'+dummyVarTestStringified+'<br/><br/>'+'Your orignal website is<br/>'+preReponseParsed);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
//Forward Slashes needs to equal %2F

*/
var http = require(“http”);
var http_server = http.createServer();
http_server.on(‘request’, function(request, response){
response.end(‘HTTP response’);
});
http_server.listen(5000,’localhost’);