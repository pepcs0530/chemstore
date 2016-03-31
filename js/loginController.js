angular.module('chemstore', [])
    .controller('loginController', function($scope,$http) {
                
    $scope.createLogin = function () {
        console.log($scope.login);    
        $http({
            method  :   'POST',
            url     :   '../php/createSession.php',
            data    :   {ca_user: $scope.login.username,ca_pass: $scope.login.password}
        }).then(function(response) {
            $scope.listAcount = response.data;
            console.log($scope.listAcount);
        });
        
        
    }
    
    });