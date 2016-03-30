angular.module('myApp', [])
    .controller('namesCtrl', function($scope,$http) {
        $http({
            method  :   'GET',
            url     :   '../php/select_chemLocation.php'
        }).then(function(response) {
            $scope.listLocation = response.data;
        });

        $scope.getdata = function() {
            $http({
                method  : 'POST',
                url     : '../php/select_chemCategory.php',
                data    : {cl_name: $scope.selectData.cl_name}, //forms user object
                headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
            }).then(function(response) {
                $scope.chemList = response.data;
            })
        }
    });