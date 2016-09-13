

$(document).ready(function() {
    var template = [];
    var palette = [];
    var mail = "";

    mail = document.location.search.substring(6);

    if (mail == "") {

        $(location).attr("href", "http://localhost:443/index.html");
    }

    var socket = io.connect('http://localhost:443');

    socket.emit("mail", {
        pepe1 : varaible1,
        pepe2 : varaible2,
        pepe3 : varaible3,
    });
    socket.emit("template", "Je veux tous les templates disponible");


    socket.on("page", function(id) {
        if (id) {
            $(location).attr("href", "http://localhost:443/index.html");
        }

    })
    socket.on("listTmp", function(listRow) {

        for (var i in listRow) {
              template[i] = listRow[i];
        }


    })


    $("#fslogo").change(function() {
        console.log(template);
        var name = $(this).val();
        var preview = document.querySelector("#logo");
        var file = document.querySelector("#fslogo").files[0];
        var reader = new FileReader();
        reader.addEventListener("load", function() {
            preview.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }

        var img = name.split(".");
        var ext = img[img.length - 1];

        var name = img[img.length - 2].split("\\");
        var imgName = name[name.length - 1];
        $("#nameFile").val(imgName);

        $('input[name=extension]').val(ext);

        console.log(ext);
        console.log(imgName);



    });

    $("#logo").load(function() {

       /* On prelève les couleurs du logos */

        var $myImage = $("#logo");
        var colorThief = new ColorThief();


        //Grabs 8 swatch color palette from image and sets quality to 5 (0 =slow, 10=default/fast)
        var cp = colorThief.getPalette($myImage[0], 8, 5);

        var palette1 = hex(cp[1][0], cp[1][1], cp[1][2]);
        var palette2 = hex(cp[2][0], cp[2][1], cp[2][2]);
        var palette3 = hex(cp[3][0], cp[3][1], cp[3][2]);
        var palette4 = hex(cp[0][0], cp[0][1], cp[0][2]);

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


        $('input[name=dominante]').val(palette1);
        $('input[name=moins]').val(palette2);
        $('input[name=inter]').val(palette3);
        $('input[name=seconde]').val(palette4);

        /* on injecte les couleur dans les template */
        /*
        var template = [
          {'name' : 'template1'},
          {'name' : 'template2'}
        ];
        */



         palette['dominante'] = palette1;
         palette['moins'] = palette2;
         palette['inter'] = palette3;
         palette['second'] = palette4;

         chargerTemplate();

    });

    function hex(r, g, b) {
        return "#" + ("0" + parseInt(r, 10).toString(16)).slice(-2) + ("0" + parseInt(g, 10).toString(16)).slice(-2) + ("0" + parseInt(b, 10).toString(16)).slice(-2);
    }
    function chargerTemplate(){

      $('#presentation').empty();

      for (var i in template) {
          console.log(template[i].name);
          $('#presentation').append('<li class="boxFrame" ><div><input type="radio" name="template" value="'+ template[i].name +'" /></div><div><iframe class="framet" src="http://localhost:443/'+ template[i].name +'/index.html?dominante='+ palette.dominante.substring(1) +'&moins='+ palette.moins.substring(1) +'&inter='+ palette.inter.substring(1) +'&second='+ palette.second.substring(1) +'" frameborder="0" allowfullscreen ></iframe></div></li>');
      }
    }

});
