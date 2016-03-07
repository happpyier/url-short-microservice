var express = require('express');
var app = express();
var path = require("path");
app.set('port', (process.env.PORT || 5000));

app.get('/:tagId', function(request, response) {
  var dummyVar = Object.keys(request.query);
  var dummyVarTest = JSON.stringify(request.query);
  var preReponseParsed = request.params.tagId;
  response.send(dummyVar+'<br/>'+dummyVarTest+'<br/><br/>'+'Your orignal website is<br/>'+preReponseParsed);
});

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname+'/index.html'));
  //response.end('Its Over!'); 
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
