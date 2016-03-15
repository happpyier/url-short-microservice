/*
http://expressjs.com/en/guide/routing.html USING this as a reference;
http://stackoverflow.com/questions/20089582/how-to-get-url-parameter-in-express-node-js Also a reference;
*/
var express = require('express');
var app = express();
var path = require("path");
var url = require("url");
app.set('port', (process.env.PORT || 5000));
app.set("Content-Type", "text/html");
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname+'/index.html'));
  //response.end('Its Over!'); 
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
