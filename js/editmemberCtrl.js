angular.module('chemstore', [])
    .controller('editmembersCtrl', function($scope,$http) {
//        $http({
//            method  :   'GET',
//            url     :   '../php/selectFromChemLocation.php'
//        }).then(function(response) {
//            $scope.listLocation = response.data;
//        });
//
//        $scope.getdata = function() {
//            $http({
//                method  : 'POST',
//                url     : '../php/selectFromChemCategory.php',
//                data    : {cl_name: $scope.selectData.cl_name}, //forms user object
//                headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
//            }).then(function(response) {
//                $scope.chemList = response.data;
//            })
//        }
    
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
        
        
        $scope.showValue = function(){
            console.log($scope.acctyp);
            console.log($scope.acctyp.cat_pk);
            console.log($scope.acctyp.cat_name);
            
        }
        
        //      เพิ่มสมาชิก
        $scope.createMember = function(){
            
            console.log("-----------");
            console.log($scope.acctyp.cat_pk);
            console.log("-----------");
            
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
                }).success(function (data, status, headers, config) {
                    console.log(data);

                    alert("เพิ่มสมาชิกเรียบร้อย");

                    // clear modal content
                    //$scope.clearMember();

                    // refresh the list
                    //$scope.getAll();
                });
            
            
//            $http({
//                method  : 'POST',
//                url     : '../php/create_member.php',
//                data    : {
//                    'code' : $scope.code,
//                    'user' : $scope.user, 
//                    'pass' : $scope.pass,
//                    'tname' : $scope.tname,
//                    'fname' : $scope.fname,
//                    'lname' : $scope.lname,
//                    'tel' : $scope.tel,
//                    'acctyp' : $scope.acctyp
//                }, //forms user object
//                headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
//                }).then(function(response) {
//                    $scope.chemacc = response.data;
//                    console.log("select2 :"+$scope.acctyp);
//                })
//            
            
        }
        
        //  แก้ไขข้อมูลส่วนตัว
        $scope.confirmMember = function(){
            $scope.checked = true;
            $scope.dis = false;
            $scope.btng1 = false;
            $scope.btng2 = false;
        }
        
        //  เปลี่ยนรหัสผ่าน
        $scope.changePassMember = function(){
            $scope.checked = false;
            $scope.dis = false;
            $scope.btng1 = false;
            $scope.btng3 = false;
        }
        
        //  ยกเลิก
        $scope.cancleMember = function(){
            window.location.href="../html/editMember.html";
        }
        
        //    เลือกผู้ใช้
        $http({
            method  :   'POST',
            url     :   '../php/select_account_where.php',
            data    : { ca_code: "x001"}, 
            headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
                    }
        ).then(function(response) {
            $scope.listAcount = response;
            console.log($scope.listAcount);
            
            $scope.pk = response.data[0].ca_pk;
            $scope.code = response.data[0].ca_code;
            $scope.tname = response.data[0].ca_tname;
            $scope.fname = response.data[0].ca_fname;
            $scope.lname = response.data[0].ca_lname;
            $scope.tel = response.data[0].ca_tel;
            
            $scope.user = response.data[0].ca_user;
            $scope.passOld = response.data[0].ca_pass;
            //$scope.new_pass = response.data[0].ca_pass;
            //$scope.re-new_pass = response.data[0].ca_pass;
        });
    
        //  ยืนยันแก้ไขข้อมูลส่วนตัว
        $scope.updateMember = function(){
            alert($scope.pk);
            $http.post("../php/update_member.php",{
                'pk' : $scope.pk, 
                'code' : $scope.code, 
                'tname' : $scope.tname,
                'fname' : $scope.fname,
                'lname' : $scope.lname,
                'tel' : $scope.tel
                }).success(function (data, status, headers, config) {
                    console.log(data);

                    alert("แก้ไขสมาชิกเรียบร้อย");
                    window.location.href="../html/editMember.html";

                    // clear modal content
                    //$scope.clearMember();

                    // refresh the list
                    //$scope.getAll();
                });
        }
        
        //  ยืนยันแก้ไขรหัสผ่าน
        $scope.updatePassMember = function(){
            alert($scope.pk);
            if($scope.passOld != $scope.pass){
                alert("รหัสผ่านไม่ถูกต้อง / ไม่ได้กรอกรหัสผ่าน");
            }else{
                if($scope.new_pass == null || $scope.re_new_pass == null){
                    alert("กรุณากรอกรหัสผ่านใหม่ / รหัสผ่านใหม่อีกครั้ง");
                }else{
                    if($scope.new_pass != $scope.re_new_pass){
                    alert("รหัสผ่านใหม่ / รหัสผ่านใหม่อีกครั้ง ไม่ตรงกัน");
                }
                    else{
                        $http.post("../php/update_passMember.php",{
                            'pk' : $scope.pk, 
                            'pass' : $scope.new_pass
                            }).success(function (data, status, headers, config) {
                                console.log(data);

                                alert("แก้ไขรหัสผ่านเรียบร้อย");
                                window.location.href="../html/editMember.html";
                            });                             
                        
                    }
                }
                
            }
            
        }
    
        
    });