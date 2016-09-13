// Include Color Thief Script
// https://github.com/lokesh/color-thief

function colorChange(){
  //Be sure to include <img id="coverImage" src="" alt=""/>
  var nb = $("input[name='nombre']").val();
  var id = nb -1;
  var list = ["coverImage1","coverImage2","coverImage3","coverImage4","coverImage5"];
  //var nb = $("input[name='nombre']").val();
  //var id = nb - 1;
  var $myImage = $("."+list[id]);
  var colorThief = new ColorThief();


  //Grabs 8 swatch color palette from image and sets quality to 5 (0 =slow, 10=default/fast)
  var cp = colorThief.getPalette($myImage[0], 8, 5);

  //Sets background to 3rd color in the palette.
  $('.palette1').css('background-color', 'rgb('+cp[1][0]+','+cp[1][1]+','+cp[1][2]+')');
  $('.palette2').css('background-color', 'rgb('+cp[2][0]+','+cp[2][1]+','+cp[2][2]+')');
  $('.palette3').css('background-color', 'rgb('+cp[3][0]+','+cp[3][1]+','+cp[3][2]+')');
  $('.palette7').css('background-color', 'rgb('+cp[0][0]+','+cp[0][1]+','+cp[0][2]+')');

}
/*
$(document).ready(function() {
  //Make sure image is loaded before running.
  colorChange();
});*/
