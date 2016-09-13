$(document).ready(function(){
  var socket = io.connect("http://localhost:1337");
  $("#uplogo").submit(function(event){

    event.preventDefault();

    var fslogo = $("#imglogo").attr('src');

    socket.emit("imgload",{
      imglogo : fslogo
    });

    socket.on('rslogo', function(infologo){
       console.log(infologo);
    })


  });

});
