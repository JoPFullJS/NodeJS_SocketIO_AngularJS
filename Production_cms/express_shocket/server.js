var io = require('socket.io');
var express = require('express')
var http = require('http');
require('html');

var app = express();
var server = http.createServer(app);


app.use(express.static(__dirname + '/views'));

/*
app.get('/', function(req, res, next){
  res.render('/views/index.html');
});
*/
server.listen(8333);

var socket = io.listen(server, {
  flashPolicyServer: false,
  transports: ['websocket', 'flashsocket', 'htmlfile', 'xhr-multipart', 'xhr-polling', 'jsonp-polling']
});
var allClients = 0;
var clientId = 1;
socket.on('connection', function(client) {
  var my_timer;
  var my_client = { "id": clientId, "obj": client };
  clientId += 1;
  allClients += 1;
  my_timer = setInterval(function () {
    my_client.obj.send(JSON.stringify({ "timestamp": (new Date()).getTime(), "clients": allClients }));
  }, 1000);
  client.on('message', function(data) {
    my_client.obj.broadcast(JSON.stringify({ message: "poke send by client "+my_client.id }));
    console.log(data);
  });
  client.on('disconnect', function() {
    clearTimeout(my_timer);
    allClients -= 1;
    console.log('disconnect');
  });
});
