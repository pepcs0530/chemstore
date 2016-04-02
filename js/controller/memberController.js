angular.module('chemstore', [])
    .controller('membersController', function($scope,$http) {
        //    เลือกประเภทผู้ใช้
        $http({
            method  :   'GET',
            url     :   '../php/select_accoountType.php'
        }).then(function(response) {
            $scope.listAcountType = response.data;
        });
    
        //     ล้างค่า
        $scope.clearMember = function(){
            $scope.code = "";
            $scope.user = "";
            $scope.pass = "";
            $scope.tname = "";
            $scope.fname = "";
            $scope.lname = "";
            $scope.desc = "";
            $scope.tel = "";
        }
        
        //      เพิ่มสมาชิก
        $scope.createMember = function(){   
            $http.post("../php/create_member.php",{
                'code' : $scope.code, 
                'user' : $scope.user, 
                'pass' : $scope.pass, 
                'tname' : $scope.tname,
                'fname' : $scope.fname,
                'lname' : $scope.lname,
                'desc' : $scope.desc,
                'useflg' : $scope.useflg,
                'tel' : $scope.tel,
                'acctyp' : $scope.acctyp.cat_pk
                }).success(function (data) {
                    console.log(data);
                    alert("เพิ่มสมาชิกเรียบร้อย");
                });
        }
                
        //  ยกเลิก
        $scope.cancleMember = function(){
            window.location.href="../html/editMember.html";
        }
    });