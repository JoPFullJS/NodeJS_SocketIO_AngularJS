var express = require("express");
var app     = express();

app.use(express.static(__dirname + '/Views'));
//Store all HTML files in view folder.



app.get('/index.html',function(req,res){
  reponse.sendFile(path.join(__direname + 'index.html'));
  //It will find and locate index.html from View or Scripts
});

app.listen(443);

console.log("Running at Port 443");
