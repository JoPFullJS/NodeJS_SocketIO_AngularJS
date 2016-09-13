'use strict';

app.config(
    function ($routeProvider){
      $routeProvider
          .when('/home', {
            templateUrl: 'views/home.html'
          })
          .when('/connexion', {
            templateUrl: 'views/connexion.html'
          })
          .when('/nouveaucompte', {
            templateUrl: 'views/comptes.html' // Choix de creation compte client ou transporteur
          })
          .when('/compte/transporteur', {
            templateUrl: 'views/compte_transporteur.html' // Creation du compte transporteur
          })
          .when('/compte/client', {
            templateUrl: 'views/compte_client.html' //Creation du compte client
          })
          .when('/profile_client', {
            templateUrl: 'views/profile_client.html' // Profile client
          })
          .when('/voir_profile_client', {
            templateUrl: 'views/voir_profile_client.html' // Profile client
          })
          .when('/modifier_profile_client', {
            templateUrl: 'views/modifier_profile_client.html' // Profile client
          })
          .when('/profile_transporteur', {
            templateUrl: 'views/profile_transporteur.html' // Profile transporteur
          })
          .when('/voir_profile_transporteur', {
            templateUrl: 'views/voir_profile_transporteur.html' // Profile transporteur
          })
          .when('/modifier_profile_transporteur', {
            templateUrl: 'views/modifier_profile_transporteur.html' // Profile transporteur
          })
          .when('/upload', {
            templateUrl: 'views/upload.html' //Upload logo et choix du template
          })
          .when('/changement_dns', {
            templateUrl: 'views/changement_dns.html' //Changement du DNS transporteur
          })
          .when('/choix_dns', {
            templateUrl: 'views/choix_dns.html' //Choix du DNS transporteur
          })
          .when('/gerer_site', {
            templateUrl: 'views/gerer_site.html' //Choix du DNS transporteur
          })
          .when('/envoie', {
            templateUrl: 'views/envoie_bien.html' //Choix du DNS transporteur
          })
          .when('/contact', {
            templateUrl: 'views/contact.html' //Choix du DNS transporteur
          })
          .when('/ecologie', {
            templateUrl: 'views/ecologie.html' //Choix du DNS transporteur
          })
          .when('/news', {
            templateUrl: 'views/news.html' //Choix du DNS transporteur
          })
          .when('/faq', {
            templateUrl: 'views/faq.html' //Choix du DNS transporteur
          })
          .when('/avantagesclient', {
            templateUrl: 'views/avantages_client.html' //Choix du DNS transporteur
          })
          .when('/avantagestransporteur', {
            templateUrl: 'views/avantages_transporteur.html' //Choix du DNS transporteur
          })
});
