var http = require('http');
var mysql = require('mysql');
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'waaax'
});

connection.connect(function(err) {
    if (err) {
        console.error('Impossible de faire une connection a la BDD', err);
    } else {
        console.log('connection avec la BDD établie !')
    }
});

httpServer = http.createServer(app);

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
        res.sendfile('index.html');
    })
    /*
    app.use(express.static(__dirname + '/views'));
    //Store all HTML files in view folder.
    app.use(express.static(__dirname + '/css'));
    //Store all HTML files in view folder.
    app.use(express.static(__dirname + '/js'));

    app.use(express.static(__dirname + '/node_modules/socket.io-client'));
    */
    /*
    httpServer = http.createServer(function(req,res){
    //  res.end('hello world !');
      //console.log('hello world !');

      res.writeHead(200, {'content-Type' : 'text/html'});
      fs.readFile('./views/index.html', null, function(error,data){
        if(error){
          res.writeHead(404);
          res.write('File not found !');
        }
        else{
          res.write(data);
        }
        res.end();
      });
    });
    */
httpServer.listen(1337);

	var post = {mail : "fabien.richard@gmail.com"};

var squery = connection.query('SELECT a.ID,b.ID_user,b.name,b.mail,b.statut,a.upload,a.init FROM palette As a,user AS b WHERE a.ID=b.ID_user AND b.?',[post], function(err,rows,fields){
  if(rows.length == 1){
    console.log(rows);
    console.log(rows[0].mail);
  }

   if(err){
     console.log(err);
     console.log('erreur emission.');
   }


     });

var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', function(socket) {

    socket.emit('mes', 'NodeJS');
    socket.on('color', function(color) {
        console.log(color);
        var post = color;

        /*
                  var squery = connection.query('SELECT * FROM palett WHERE ID_user=0', function(err,rows,fields){
                     if(err){
                       socket.emit('error', err);
                       console.log('erreur emission.');
                     }
                     if(rows.length === 0){
                       socket.emit('error', 'Aucun utilisateur trouver !');
                     }
                     if(rows.length > 0){
                       socket.emit('list', rows);

                     }
                       });

                       console.log(squery);
        */



        try {
            var query = connection.query('INSERT INTO palett SET ? ', [post], function(err, res) {
                console.log(err);
            });
            console.log(query);
        } catch (err) {
            if (err) {
                throw err;
            }
        }




    })

    socket.on('update', function(sokup) {
      var update = sokup;

        try {
            var query2 = connection.query('UPDATE palett SET ? WHERE ID_user=123456', [update], function(err, res) {

                socket.emit('succup', 'update de la couleur reussit !');

            });

            console.log(query2);
        } catch (err) {
            if (err)
                throw err;

        }


    })
});
