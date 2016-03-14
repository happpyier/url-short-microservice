//http://expressjs.com/en/guide/routing.html USING this as a reference;
//http://stackoverflow.com/questions/20089582/how-to-get-url-parameter-in-express-node-js Also a reference;
var express = require('express');
var app = express();
var path = require("path");
var url = require("url");
var pg = require('pg');
var UrlValue = "";
var resultsSQL = "";
var dummyVar = "";
var getInfoFromDB1 = function (request, response, next) {
  var OrignalHttpForUse = (request.url).substring(1);
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT id, original_url, short_url FROM url_short_microservice', function(err, result) {
      if (err)
       //{ resultsSQL = "Error "+ err; response.send("Error " + err);  }
	   { resultsSQL = ("Error " + err); }
      else
       //{ resultsSQL = "Results " + {results: result.rows}; response.render('pages/db', {results: result.rows} ); }
	   { resultsSQL = JSON.stringify(result.rows); }
	   done();
    });
  });
  next();
}
var getInfoFromDB2 = function (request, response){
  var OrignalHttp = (request.url).substring(1);
  response.send(resultsSQL.replace('&colon', ':')+'<br/>This is the page that gets the url from the DB <br/>'+OrignalHttp);
  //response.end();
}
var sendInfoToDB1 = function (request, response, next) {
  var OrignalHttpForUse = (request.url).substring(5);
  var mysqlOrignalHttpForUse = OrignalHttpForUse.replace(/&/g, '&amp').replace(/</g, '&lt').replace(/>/g, '&gt').replace(/"/g, '&quot').replace(/:/g, '&colon');
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query("INSERT INTO url_short_microservice (original_url, short_url) VALUES ('"+mysqlOrignalHttpForUse+"', 'test')", function(err, result) {
      if (err)
       //{ resultsSQL = "Error "+ err; response.send("Error " + err);  }
	   { resultsSQL = ("Error " + err); }
      else
       //{ resultsSQL = "Results " + {results: result.rows}; response.render('pages/db', {results: result.rows} ); }
	   { resultsSQL = JSON.stringify(result.rows); }
	   done();
    });
  });
  next();
}
var sendInfoToDB2 = function (request, response){
  var OrignalHttpForUse = (request.url).substring(5);
  var mysqlOrignalHttpForUse = OrignalHttpForUse.replace(/&/g, '&amp').replace(/</g, '&lt').replace(/>/g, '&gt').replace(/"/g, '&quot').replace(/:/g, '&colon');
  var mysqlQuery = "INSERT INTO url_short_microservice (original_url, short_url) VALUES ("+mysqlOrignalHttpForUse+", 'test')";
  response.send(mysqlOrignalHttpForUse+'<br/>This is the page that gets the url from the DB <br/>The Database has the following<br/>'+resultsSQL+'<br/> The query is<br/>'+mysqlQuery);
  //response.end();
}
var outputURL = console.log(UrlValue);
app.set('port', (process.env.PORT || 5000));
app.set("Content-Type", "text/html");
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname+'/index.html'));
  //response.end('Its Over!'); 
});
app.get(/^\/http/i, [getInfoFromDB1, getInfoFromDB2]);
app.get(/^\/new\/http/i, [sendInfoToDB1, sendInfoToDB2]);
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
