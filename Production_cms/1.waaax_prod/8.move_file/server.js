var formidable = require('formidable'); // Gestion ecriture lecture fichier importés
var http = require('http'); // module creation du server node
//var util = require('util');
var fs = require('fs-extra'); // Gestion ecriture lecture fichier importés
var mysql = require('mysql'); // Gestion des traitement Mysql

var express = require('express'); //Gestion des route de l'application et gestion de la methode post et get

var app = express(); //Methode du module express

httpServer = http.createServer(app); //Création serveur node js avec pour paramètre la methode express pour le routing

//----------------------------------------------------
//Paraètres de connexion à la DDB
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'waaax'
});
//-------------------------------------------------

// On demande à l'application express de pouvoir d'utilier tous les fichiers de notre application
app.use(express.static(__dirname + '/'));

httpServer.listen(443); //On specifie le port d'écoute du serveur node

var dossier = {};
var fichier = {};
var color = {};

// on se connecte à la DDB
connection.connect(function(err) {
    if (err) {
        console.error('Impossible de faire une connection a la BDD', err);
    } else {
        console.log('connection avec la BDD établie !')
    }
});
//------------------------------------------------

// Les sockets ecoute le serveur httpServer pour les échanges de données
var io = require('socket.io').listen(httpServer);

// on creé une conexion pour initier les sockets
io.sockets.on('connection', function(socket) {

    socket.on('mail', function(info) { // On reçoie une socket par la methode socket.on avec nom du paquet et les valeur envoyés

        var post = {
            mail: info
        };


        try {
            var query = connection.query('SELECT a.ID,b.ID_user,b.name,b.mail,b.statut,a.upload,a.init FROM palette AS a,user AS b WHERE a.ID=b.ID_user AND b.?', [post], function(err, rows, fields) {
                //
                if (rows.length == 0) {
                    //socket.emit('error', 1);
                }
                if (rows.length > 0) {
                    if (rows[0].upload == 0 && rows[0].init == 0) {
                        //on se direge vers la page choix template
                        // on recupère les données
                        dossier.mail = rows[0].mail;
                        dossier.fichier = rows[0].name;
                        dossier.ID = rows[0].ID;

                        console.log(dossier);
                    } else if (rows[0].init == 1 && rows[0].statut == 1) {
                        socket.emit("page", 1);
                        console.log("erreur de parcours")
                        //on se dirige vers la page accueil
                    }
                    //socket.emit('list', rows);
                }
            });


        } catch (err) {
            if (err) {
                throw err;
            }
        }
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

    app.post('/index.html#/upload', function(req, res) { //Methode post d'express, utilisé pour les formulaires de soumission
        /* Process the form uploads */
        if (req.url == '/index.html' && req.method.toLowerCase() == 'post') {
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
                res.render('index');
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
