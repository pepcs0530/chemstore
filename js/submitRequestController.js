angular.module('chemstore', [])
    .controller('submitRequestController', function($scope,$http) {
        $http({
            method  :   'GET',
            url     :   '../php/select_chemReceipt.php'
        }).then(function(response) {
            $scope.listReciept = response.data;
            console.log($scope.listReciept);
        });
        $scope.showPopup = function () {
            alert("ดูข้อมูล...");
            window.open( "../html/showRequestLoc.html", "myWindow",  "status = 1, height = 500, width = 1000, resizable = 0" );
        }
    });
