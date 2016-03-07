var express = require('express');
var app = express();
var path = require("path");
app.set('port', (process.env.PORT || 5000));

app.get('/new/:tagId', function(request, response) {
  
  var preReponseParsed = request.params.tagId;
  var reponseParsed = preReponseParsed.replace(",", "");
  var searchedString = /^\D*\s[1-9]+\S\s\d*$/.test(reponseParsed);
  var searchedString2 = /^\d{8,10}$/.test(reponseParsed);
  
  if (searchedString2  == true)
  {
	var d = new Date(preReponseParsed*1000);
	var preDateInNaturaltime = d.toDateString();
	dateInNaturaltime = preDateInNaturaltime.substr(preDateInNaturaltime.indexOf(" ") + 1);
	response.send("{\"unix\":"+reponseParsed+",\"natural\":\""+dateInNaturaltime+"\"}"); 
  }
  else
  {
	  if (searchedString == true)
	  {
		var dateInUnixtime = Date.parse(reponseParsed)/ 1000;
		if (isFinite(dateInUnixtime) == false)
		{
			response.send("Please enter a valid date in the form of Unix Time(1451606400) or Natural Time(January 15 2015)")
		}
		else
		{
			response.send("{\"unix\":"+dateInUnixtime+",\"natural\":\""+reponseParsed+"\"}");
		}
	  }
	  else
	  {
		response.send("Please enter a valid date in the form of Unix Time(1451606400) or Natural Time(January 15 2015)")
	  }
  }
});

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname+'/index.html'));
  //response.end('Its Over!'); 
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
