var http = require('http');
var md5 = require('MD5');

httpServer = http.createServer(function(req,res){
  res.end('hello World !');
});

httpServer.listen(1337);
var io = require('socket.io').listen(httpServer);
var users = {};
var messages = [];
var history = 2;
// des qu'il y a une connexion sur une des socket

io.sockets.on('connection', function(socket){

  var me = false;
  console.log('nouvel utilisateur');
  for(var k in users){
    socket.emit('newuser', users[k]);
  }
  for(var k in messages){
    socket.emit('newmsg', messages[k]);
  }
  /* On a recu un message*/

  socket.on('newmsg', function(message){
    message.user = me;
    date = new Date();
    message.h = date.getHours();
    message.m = date.getMinutes();
    messages.push(message);
    if(messages.length > history)
    {
      messages.shift();
    }
    io.sockets.emit('newmsg', message);
  })

  //on receptionne l'évènement login avec socket.on
  /* je me connecte*/

  socket.on('login', function(user){
    me = user;
    me.id = user.mail.replace('@','-').replace('.','-');
    me.avatar = 'https://gravatar.com/avatar/' + md5(user.mail) + '?s=50';
    socket.emit('logged'); // j'envoie a l'utilisateur courant
    users[me.id] = me;
    //socket.broadcast.emit('newuser'); evoi un contenu alert au autres utilisateurs
    io.sockets.emit('newuser', me); // j'envoie a tous les utilisateurs
  })

  /*je quitte le chat*/

  socket.on('disconnect', function(){
    if(!me){
      return false;
    }
    delete users[me.id];
    io.sockets.emit('disuser', me);
  })

});
