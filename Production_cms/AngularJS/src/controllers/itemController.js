'use strict';

app
    .controller('itemIndex', function($scope){

    })
    .controller('itemList', function($scope, itemProvider){
      $scope.items = itemProvider.getItems();
    })
    .controller('itemCreate', function($scope, categoryProvider, itemProvider){
      $scope.categories = categoryProvider.getCategories();
      $scope.items = itemProvider.getItems();
      
      $scope.createItem = function (item) {
        $scope.items = itemProvider.create(item);
      }
    })
    .controller('itemRemove', function($scope){

    })
;
