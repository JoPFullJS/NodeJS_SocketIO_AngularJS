var http = require('http');
var express = require('express');
var app = express();
var user = [];


httpServer = http.createServer(app);

app.use(express.static(__dirname + '/'));


    httpServer.listen(1337);

    var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', function(socket) {
console.log(user);
  // user.id = 'ferme';
   delete user.id;
  //onetablie la connection à la DDB.

  // socket.on('cop', function(data){
  //
  //   console.log(user.id);
  // })

  socket.on('cpses', function(data){
    user.id = data.id;
    user.info = data.info;

    console.log(user);
  })



});
