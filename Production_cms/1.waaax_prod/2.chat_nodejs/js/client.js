$(document).ready(function(){
 //on ouvre la connection avec une socket
  var socket = io.connect('http://localhost:1337');
  var msgtpl = $('#msgtpl').html();
  var lastmsg = false;
  $('#msgtpl').remove();
  $('#loginform').submit(function(event){

    event.preventDefault();
    //on emet un evenement dont le nom est login (arbitraire)
    socket.emit('login',{
      username : $('#username').val(),
      mail : $('#mail').val()
    })

  });
  socket.on('logged',function(){
    //  $('#loginform').empty();
      $('#loginform').fadeOut();
      $('#message').focus();

  })

  /* Envoi de message*/
  $('#form').submit(function(event){
      event.preventDefault();
      socket.emit('newmsg', {message : $('#message').val() });
      $('#message').val('');
      $('#message').focus();
  });

  socket.on('newmsg', function(message){
    if(lastmsg != message.user.id)
    {
      $('#messages').append('<div style="clear:both; height:10px;"></div>');
      lastmsg = message.user.id;
    }
    $('#messages').append('<div class="message">' + Mustache.render(msgtpl, message) + '</div>');
    $('#messages').animate({scrollTo : $('#messages').prop('scrollHeight')}, 50);
  })


  /* Gestion des connecter */
        //-------

  socket.on('newuser', function(user){
    $('#users').append('<img src="' + user.avatar + '" id="' + user.id + '" style="display:block; margin-top:10px;">');

  })
  socket.on('disuser',function(user){
    $('#' + user.id).remove();
  })

  /*--------------------------------------*/


});
