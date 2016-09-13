var socket = io.connect('http://localhost:1337');

$(document).ready(function() {

    //alert('hello');
    //socket.emit('cop','test');

    $('#cpForm').submit(function(event) {

      event.preventDefault();

      var pseudo = $('input[name=pseudo]').val();
      var mail = $('input[name=mail]').val();

      socket.emit('cpses',{
        id : pseudo,
        info : mail
      })

    });

});
