'use strict';

app.config(
    function ($routeProvider){
      $routeProvider
          .when('/', {
            templateUrl: 'views/connexion.html'
          })
          .when('/color', {
            templateUrl: 'views/color.html'
          })
});
