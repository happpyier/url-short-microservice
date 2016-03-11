//http://expressjs.com/en/guide/routing.html USING this as a reference;
//http://stackoverflow.com/questions/20089582/how-to-get-url-parameter-in-express-node-js Also a reference;
var express = require('express');
var app = express();
var path = require("path");
var url = require("url");
var pg = require('pg');
var UrlValue = "";
/*
var convertURL = function (request, response, next, id){
  preUrlValue = id;
  UrlValue = preUrlValue.replace(/\//g, "%2F");
  response.send(UrlValue);
  //next();
}
var convertURL2 = function (request, response){
	response.send(UrlValue);
}
*/
var outputURL = console.log(UrlValue);
app.set('port', (process.env.PORT || 5000));
app.set("Content-Type", "text/html");
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
});

//app.param('/:tagId', convertURL, next, id);
app.param('url', function (request, response, next, id) {
  preUrlValue = id;
  UrlValue = preUrlValue.replace(/\//g, "%2F");
  response.send(UrlValue+'<br/>'+Object.keys(request));
  response.end("it ended!");
  next();
});
app.get('/:url', function (req, res) {  
 
  console.log('Someone made a request!');
  res.end();
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
//Forward Slashes needs to equal %2F
 /*
 function(request, response) {
  var dummyVar = Object.keys(request);
  var dummyVarTest = request.query;
  var dummyVarTestStringified = JSON.stringify(request.url);
  var preReponseParsed = (request.url).replace(/%2F/g, "/");
  //var preReponseParsed = request.url;
  response.send(dummyVar+'<br/> dummyVarTest--->'+dummyVarTest+'<br/> dummyVarTestStringified--->'+dummyVarTestStringified+'<br/><br/>'+'Your orignal website is<br/>'+preReponseParsed);
  
}
*/
