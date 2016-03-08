
var express = require('express');
var app = express();
var path = require("path");
var url = require("url");


/*
app.get('/:tagId', function(request, response) {
  var dummyVar = Object.keys(request);
  var dummyVarTest = request.query;
  var dummyVarTestStringified = JSON.stringify(request.url);
  var preReponseParsed = request.params.tagId;
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
var fs = require('fs');
var http = require('http');
//var url = require('url') ;
app.set('port', (8080));
app.createServer('/', function (request, response) {
  var queryObject = url.parse(request.url,true).query;
  console.log(queryObject);
  response.sendFile(path.join(__dirname+'/index.html'));
  response.writeHead(200);
  response.end('Feel free to add query parameters to the end of the url');
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});