angular.module('chemstore', [])
    .controller('menuController', function($scope,$http) {
    $http({
        method  :   'GET',
        url     :   '../php/getSession.php'
    }).then(function(response) {
        $scope.session = response.data;
    });
    
});