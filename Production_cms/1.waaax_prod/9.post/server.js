var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    fs   = require('fs-extra');

var express = require('express');

var app = express();

    httpServer = http.createServer(app);
    app.use(express.static(__dirname + '/'));
    app.use(express.static(__dirname + '/index.html'));

    httpServer.listen(1337);

app.post('/index.html', function(req, res) {
  /* Process the form uploads */
  if (req.url == '/index.html' && req.method.toLowerCase() == 'post') {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {

      console.log(fields);
      //res.render('index');
      //res.end(util.inspect({fields: fields, files: files}));
      res.end();
    });

    return;
  }
/*
  //Display the file upload form.
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
  */

});
