  var http = require('http');
  var mysql = require('mysql');
  var express = require('express');
  var app = express();
  var formidable = require('formidable');
  var util = require('util');
  var fs = require('fs-extra');

  // On simule la persistance des donn�es avec cette variable
  var user = {};

  //connection au server mysql

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

  var app = express();

  httpServer = http.createServer(app);

  app.use(express.static(__dirname + '/'));



  //httpServer.listen(80);
  httpServer.listen(443);

  var io = require('socket.io').listen(httpServer);

  user.mail = "fabien.richard@gmail.com"; //on considere que la personne est connecter et que l'adresse mail est sauvegarder coté serveur


  io.sockets.on('connection', function(socket) {

      /*  Initialisation du choix de la paga � afficher  */
      socket.on('initialize', function(init) {

          console.log("recu");
          if (!user.mail) {

              var pg = 1;
              socket.emit("page", pg);

          } else {
              socket.emit('resInit', 1);
          }

      })

      socket.on('choix', function(choix) {
          var init = {};
          var post = {
              mail: user.mail
          };

          try {

              var query = connection.query('SELECT a.ID,b.ID_user,b.name,b.mail,b.statut,a.upload,a.init FROM palette AS a,user AS b WHERE a.ID=b.ID_user AND b.?', [post], function(err, rows, fields) {
                  console.log(rows);
                  if (rows.length === 0) {
                      socket.emit('ctError', 'Aucun utilisateur trouver !');
                  }
                  if (rows.length == 1) {
                      //socket.emit('list', rows);

                      if (rows[0].statut == 0) {

                          var client = 2;
                          socket.emit("page", client);

                      } else if (rows[0].statut == 1) {

                          if (rows[0].upload == 0) {

                              var upload = 5;
                              socket.emit("page", upload);

                          } else if (rows[0].upload == 1) {
                              if (rows[0].init == 0) {

                                  var initialize = 4;
                                  socket.emit("page", initialize);

                              } else if (rows[0].init == 1){

                                  var transport = 3;
                                  socket.emit("page", transport);
                              }
                          }
                      }

                  } else {
                      //L'utilisateur dispose d'un autre compte
                  }
              });
              //console.log(query);
          } catch (err) {
              if (err) {
                  throw err;
              }
          }

          /* -------- Fin initialisation Page ----------- */

      })

      socket.on('template', function(template) {

          try {  //

            var query = connection.query('SELECT * FROM template', function(err, rows, fields) {
              if (rows.length == 0) {
                  //socket.emit('error', 1);
              }
              if (rows.length > 0) {

                socket.emit("listTmp",rows);
              }

            })

          } catch (err) {
            if (err) {
                throw err;
            }
          }


      })

      app.post('/views/upload.html', function(req, res) { //Methode post d'express, utilisé pour les formulaires de soumission
          /* Process the form uploads */
          if (req.url == '/views/upload.html' && req.method.toLowerCase() == 'post') {
              var form = new formidable.IncomingForm();
              form.parse(req, function(err, fields, files) {
                  res.writeHead(200, {
                      'content-type': 'text/html'
                  });
                  //res.write('received upload:\n\n');

                  console.log(fields);

                  fichier.name = fields.title;
                  fichier.extension = fields.extension;

                  color.dominante = fields.dominante;
                  color.moins = fields.moins;
                  color.inter = fields.inter;
                  color.seconde = fields.seconde;

                  //res.write('<meta http-equiv="refresh" content="5;url=http://localhost:1337/index.html" />');
                  //var url='http://localhost:443/index.html';
                  res.render('/views/upload.html');
                  //res.end(util.inspect({fields: fields, files: files}));
                  res.end();
              });

              form.on('end', function(fields, files) {
                  /* Temporary location of our uploaded file */
                  var temp_path = this.openedFiles[0].path; // Adresse temporaire du fichier uploder
                  /* The file name of the uploaded file */
                  var file_name = this.openedFiles[0].name; // Nom du fichier uploader
                  /* Location where we want to copy the uploaded file */
                  var new_location = 'c:/localhost/express/';  //Adresse de destination du fichier

                  var destination = new_location + dossier.fichier + '/' + fichier.name + '.' + fichier.extension;

                  fs.copy(temp_path, destination, function(err) {
                      if (err) {
                          console.error(err);
                      } else {
                          console.log("success!");

                          //requetes sql
                          try {
                              var query1 = connection.query('UPDATE palette SET ? WHERE ID=?', [color, dossier.ID], function(err, res) {

                              });
                          } catch (err) {
                              if (err) {
                                  throw err;
                              }
                          }
                          try {
                              var query2 = connection.query('UPDATE info SET fichier=? WHERE ID_info=?', [destination, dossier.ID], function(err, res) {

                              });
                          } catch (err) {
                              if (err) {
                                  throw err;
                              }
                          }
                          try {
                              var query3 = connection.query('UPDATE palette SET upload=1 WHERE ID=?', [dossier.ID], function(err, res) {

                              });
                          } catch (err) {
                              if (err) {
                                  throw err;
                              }
                          }

                          connection.end();
                      }
                  });
              });

              return;
          }
      });


  });
