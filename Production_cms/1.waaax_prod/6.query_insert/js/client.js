// Include Color Thief Script
// https://github.com/lokesh/color-thief


var socket = io.connect('http://localhost:1337');
alert('pret');

$('#savez').submit(function(event) {

    console.log('recu');

    event.preventDefault();

    socket.emit('color', {
        dominante: $('input[name=dominante]').val(),
        moins: $('input[name=moins]').val(),
        inter: $('input[name=inter]').val(),
        second: $('input[name=second]').val(),
        ID_user: 123456,
        user: 'fabien'
    });


});

socket.on('list', function(lscolor) {
    console.log(lscolor);
})
socket.on('mes', function(mez) {
    console.log(mez);
})

$('#update').click(function() {
alert('click');
    socket.emit('update',{
            dominante: '#124578'

    })

});

socket.on('succup', function(res) {
    console.log(res);
})





var color = {};

function colorChange() {
    //Be sure to include <img id="coverImage" src="" alt=""/>

    /*
    var nb = $("input[name='nombre']").val();
    var id = nb -1;
    var list = ["coverImage1","coverImage2","coverImage3","coverImage4","coverImage5"];
    */

    //var nb = $("input[name='nombre']").val();
    //var id = nb - 1;
    var $myImage = $(".coverImage");
    var colorThief = new ColorThief();


    //Grabs 8 swatch color palette from image and sets quality to 5 (0 =slow, 10=default/fast)
    var cp = colorThief.getPalette($myImage[0], 8, 5);

    var palette1 = hex(cp[1][0], cp[1][1], cp[1][2]);
    var palette2 = hex(cp[2][0], cp[2][1], cp[2][2]);
    var palette3 = hex(cp[3][0], cp[3][1], cp[3][2]);
    var palette4 = hex(cp[0][0], cp[0][1], cp[0][2]);
    //console.log(color);
    //Sets background to 3rd color in the palette.
    $('.palette1').css('background-color', palette1);
    $('.palette2').css('background-color', palette2);
    $('.palette3').css('background-color', palette3);
    $('.palette4').css('background-color', palette4);

    /*------------------*/

    $('.palette1>span').html(palette1);
    $('.palette2>span').html(palette2);
    $('.palette3>span').html(palette3);
    $('.palette4>span').html(palette4);

    //console.log(color);


    $('input[name=dominante]').val(palette1);
    $('input[name=moins]').val(palette2);
    $('input[name=inter]').val(palette3);
    $('input[name=second]').val(palette4);


}

function hex(r, g, b) {
    return "#" + ("0" + parseInt(r, 10).toString(16)).slice(-2) + ("0" + parseInt(g, 10).toString(16)).slice(-2) + ("0" + parseInt(b, 10).toString(16)).slice(-2);
}



/*
$(document).ready(function() {
  //Make sure image is loaded before running.
  colorChange();
});*/
