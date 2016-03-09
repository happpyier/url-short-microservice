var express = require('express');
var app = express();
var path = require("path");
var url = require("url");
app.set('port', (process.env.PORT || 5000));
app.set({ 'content-type': 'application/json; charset=utf-8' })
app.put('/new/', function(request, response) {
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
//LOOK INTO USING MONGODB, looking at this project from the wrong direction.