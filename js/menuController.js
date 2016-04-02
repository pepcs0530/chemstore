angular.module('chemstore', [])
    .controller('menuController', function($scope,$http) {
    
    $http({
        method  :   'GET',
        url     :   '../php/getSession.php'
    }).then(function(response) {
        $scope.session = response.data;
        console.log($scope.session);
        $http({
            method  :   'GET',
            url     :   '../php/getType.php'
        }).then(function(response) {
            $scope.type = response.data;
            console.log($scope.type);
        });
        
    });
});