var http = require('http');
var mysql = require('mysql');
var express = require('express');
var app = express();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'waaax'
});

httpServer = http.createServer(app);

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
        res.sendfile('index.html');
    })

    httpServer.listen(1337);

    var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', function(socket) {

  //onetablie la connection à la DDB.
  connection.connect(function(err) {
      if (err) {
          console.error('Impossible de faire une connection a la BDD', err);
      } else {
          console.log('connection avec la BDD établie !')
      }
  });

  socket.on('lighten', function(lighten) {
      console.log(lighten);
      var eclair = lighten;

      try {
          var query = connection.query('UPDATE palett SET ? WHERE ID_user=123456', [eclair], function(err, res) {
              socket.emit('eclair', eclair.lighten);
          });
          console.log(query);
      } catch (err) {
          if (err) {
              throw err;
          }
      }
    })




});
