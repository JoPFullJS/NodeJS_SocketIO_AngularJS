'use strict';

app
    .controller('categoryIndex', function($scope){

    })
    .controller('categoryList', function($scope){

    })
    .controller('categoryCreate', function($scope, categoryProvider){
        $scope.categories = categoryProvider.getCategories();
    })
    .controller('categoryRemove', function($scope){

    })
;
