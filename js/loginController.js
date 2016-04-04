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
            
            //-------------------------------------------------------------
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
                    
                    //  login by manager
                    if($scope.type == 1){
                        alert('เข้าสู่ระบบโดย : '+$scope.session);
                        javascript:top.frames['left'].location = '../html/menu_manager.html';

                        javascript:top.frames['right'].location = '../html/requestChem.html';
                        //return true;
                    }else if($scope.type == 2){
                        alert('เข้าสู่ระบบโดย : '+$scope.session);
                        javascript:top.frames['left'].location = '../html/menu_teacher.html';

                        javascript:top.frames['right'].location = '../html/requestChem.html';
                        //return true;
                    }else if($scope.type == 3){
                        alert('เข้าสู่ระบบโดย : '+$scope.session);
                        javascript:top.frames['left'].location = '../html/menu_operator.html';

                        javascript:top.frames['right'].location = '../html/requestChem.html';
                        //return true;
                    }else if($scope.type == 4){
                        alert('เข้าสู่ระบบโดย : '+$scope.session);
                        javascript:top.frames['left'].location = '../html/menu_scientist.html';

                        javascript:top.frames['right'].location = '../html/requestChem.html';
                        //return true;
                    }else{
                        alert('username หรือ password ไม่ถูกต้อง');
                        javascript:top.frames['left'].location = '../html/menu_index.html';

                        javascript:top.frames['right'].location = '../html/login.html';
                    }
                });

            });
            //-------------------------------------------------------------
        });
    }
    
    $scope.checkSession = function () {
        alert("Test");
        //-------------------------------------------------------------
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
                    
                    //  login by manager
                    if($scope.type == 1){
                        alert('บัญชี '+$scope.session+' กำลังใช้งาน');
                        javascript:top.frames['left'].location = '../html/menu_manager.html';

                        javascript:top.frames['right'].location = '../html/requestChem.html';
                        //return true;
                    }else if($scope.type == 2){
                        alert('บัญชี '+$scope.session+' กำลังใช้งาน');
                        javascript:top.frames['left'].location = '../html/menu_teacher.html';

                        javascript:top.frames['right'].location = '../html/requestChem.html';
                        //return true;
                    }else if($scope.type == 3){
                        alert('บัญชี '+$scope.session+' กำลังใช้งาน');
                        javascript:top.frames['left'].location = '../html/menu_operator.html';

                        javascript:top.frames['right'].location = '../html/requestChem.html';
                        //return true;
                    }else if($scope.type == 4){
                        alert('บัญชี '+$scope.session+' กำลังใช้งาน');
                        javascript:top.frames['left'].location = '../html/menu_scientist.html';

                        javascript:top.frames['right'].location = '../html/requestChem.html';
                        //return true;
                    }else{
                        alert('กรุณาเข้าสู่ระบบ');
                        javascript:top.frames['left'].location = '../html/menu_index.html';

                        javascript:top.frames['right'].location = '../html/login.html';
                    }
                });

            });
            //-------------------------------------------------------------
    }
    
    });