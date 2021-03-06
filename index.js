/*
http://expressjs.com/en/guide/routing.html USING this as a reference;
http://stackoverflow.com/questions/20089582/how-to-get-url-parameter-in-express-node-js Also a reference;
*/
var express = require('express');
var app = express();
var path = require("path");
var url = require("url");
var pg = require('pg');
var UrlValue = "";
var resultsSQL = "";
var dummyVar = "";
var resultsidSQL = "";
var redirectresultsSQL = "";
var DummyVal = "";
var getInfoFromDB1 = function (request, response, next) {
  var OrignalHttpForUse = (request.url).substring(1);
  var queryOrignalHttpForUse = OrignalHttpForUse.replace(/&/g, '&amp').replace(/</g, '&lt').replace(/>/g, '&gt').replace(/"/g, '&quot').replace(/:/g, '&colon');
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query("SELECT original_url, short_url FROM url_short_microservice WHERE original_url='"+queryOrignalHttpForUse+"'", function(err, result) {
      if (err)
       //{ resultsSQL = "Error "+ err; response.send("Error " + err);  }
	   { resultsSQL = ("Error " + err); }
      else
       //{ resultsSQL = "Results " + {results: result.rows}; response.render('pages/db', {results: result.rows} ); }
	   { resultsSQL = JSON.stringify(result.rows[0]); }
	   done();
    });
  }); 
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT id FROM url_short_microservice order by id desc limit 1', function(err, result) {
      if (err)
       //{ resultsSQL = "Error "+ err; response.send("Error " + err);  }
	   { resultsidSQL = ("Error " + err); }
      else
       //{ resultsSQL = "Results " + {results: result.rows}; response.render('pages/db', {results: result.rows} ); }
	   { resultsidSQL = JSON.stringify(result.rows[0].id); }
	   done();
    });
  });
  next();
};
var getInfoFromDB2 = function (request, response){
  var OrignalHttp = (request.url).substring(1);
  response.send(resultsSQL.replace(/&colon/g, ':'));
  //response.end();
};
var redirect1 = function (request, response, next) {
  var mysqlOrignalHttpForUse = 'https://url-short-microservice.herokuapp.com/'+request.params.id;
  DummyVal = mysqlOrignalHttpForUse;
  //var mysqlOrignalHttpForUse = OrignalHttpForUse.replace(/&/g, '&amp').replace(/</g, '&lt').replace(/>/g, '&gt').replace(/"/g, '&quot').replace(/:/g, '&colon');
  pg.connect(process.env.DATABASE_URL, function(err, client, done) { 
  client.query("SELECT original_url FROM url_short_microservice WHERE short_url='"+mysqlOrignalHttpForUse+"'", function(err, result) {
      if (err)
       //{ resultsSQL = "Error "+ err; response.send("Error " + err);  }
	   { redirectresultsSQL = ("Error " + err); }
      else
       //{ resultsSQL = "Results " + {results: result.rows}; response.render('pages/db', {results: result.rows} ); }
	   { redirectresultsSQL = JSON.stringify(result.rows[0].original_url); }
	   done();
    });
  });
  next();
};
var redirect2 = function (request, response){
  var PrepageRedirectLocation = redirectresultsSQL.replace(/&colon/g, ':');
  var pageRedirectLocation = PrepageRedirectLocation.replace(/"/g, '');
  response.redirect(pageRedirectLocation);
};
var sendInfoToDB1 = function (request, response, next) {
  var OrignalHttpForUse = (request.url).substring(5);
  var mysqlID = parseInt(resultsidSQL)+1;
  var mysqlOrignalHttpForUse = OrignalHttpForUse.replace(/&/g, '&amp').replace(/</g, '&lt').replace(/>/g, '&gt').replace(/"/g, '&quot').replace(/:/g, '&colon');
  pg.connect(process.env.DATABASE_URL, function(err, client, done) { 
  client.query("WITH upsert AS(UPDATE url_short_microservice SET original_url='"+mysqlOrignalHttpForUse+"' WHERE original_url='"+mysqlOrignalHttpForUse+"' RETURNING *)INSERT INTO url_short_microservice (original_url, short_url) SELECT '"+mysqlOrignalHttpForUse+"', 'https://url-short-microservice.herokuapp.com/"+mysqlID+"' WHERE NOT EXISTS (SELECT * FROM upsert)", function(err, result) {
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
};
var sendInfoToDB2 = function (request, response){
  var OrignalHttpForUse = (request.url).substring(5);
  var mysqlOrignalHttpForUse = OrignalHttpForUse.replace(/&/g, '&amp').replace(/</g, '&lt').replace(/>/g, '&gt').replace(/"/g, '&quot').replace(/:/g, '&colon');
  if (resultsSQL.length < 0)
  {
	response.send("This Page has already been put into the system, Simply remove /New to find its short URL");
  }
  else
  {
    response.send(resultsSQL.replace(/&colon/g, ':'));
    //response.end();
  }

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
app.get('/:id(\\d+)', [redirect1, redirect2]);
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});