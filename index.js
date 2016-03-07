var express = require('express');
var app = express();
app.use(express.bodyParser());
var path = require("path");
app.set('port', (process.env.PORT || 5000));

app.post('/:tagId', function(request, response) {
  var dummyVar = Object.keys(request);
  var dummyVarTest = request.url;
  var dummyVarTestStringified = JSON.stringify(request.url);
  var preReponseParsed = 'request.params.tagId';
  response.send(dummyVar+'<br/> dummyVarTest--->'+dummyVarTest+'<br/> dummyVarTestStringified--->'+dummyVarTestStringified+'<br/><br/>'+'Your orignal website is<br/>'+preReponseParsed);
});

app.post('/', function(request, response) {
  response.sendFile(path.join(__dirname+'/index.html'));
  //response.end('Its Over!'); 
});
app.listen(app.post('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
