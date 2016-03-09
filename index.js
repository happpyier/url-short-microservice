var express = require('express');
var app = express();
var path = require("path");
var url = require("url");
var request = require('request');
request.get('/').on('response', function(request, response) {
    console.log(response.statusCode); // 200;
    console.log(response.headers['content-type']); // 'image/png';
	response.send(request.url);
  });
  /*
app.set('port', (process.env.PORT || 5000));

app.get('/:url', function(request, response) {
  var dummyVar = Object.keys(request);
  var dummyVarTest = request.query;
  var dummyVarTestStringified = JSON.stringify(request.url);
  var preReponseParsed = (request.url).replace(/%2F/g, "/");
  response.send(dummyVar+'<br/> dummyVarTest--->'+dummyVarTest+'<br/> dummyVarTestStringified--->'+dummyVarTestStringified+'<br/><br/>'+'Your orignal website is<br/>'+preReponseParsed);
});

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname+'/index.html'));
  //response.end('Its Over!'); 
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


*/