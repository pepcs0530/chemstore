angular.module('chemstore', [])
    .controller('submitRequestController', function($scope,$http) {
        $http({
            method  :   'GET',
            url     :   '../php/select_chemReceipt.php'
        }).then(function(response) {
            $scope.listReciept = response.data;
            console.log($scope.listReciept);
        });
        $scope.showmodel = function () {
            alert("ดูข้อมูล");
        }
    });
