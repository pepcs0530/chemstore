angular.module('chemstore', ['ngRoute'])

//  Login   ============================================================================================================
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
                        //javascript:top.frames['left'].location = '../html/menu_manager.html';

                        //javascript:top.frames['right'].location = '../html/requestChem.html';
                        //return true;
                        window.location.href="../html/index.html";
                    }else if($scope.type == 2){
                        alert('เข้าสู่ระบบโดย : '+$scope.session);
                        //javascript:top.frames['left'].location = '../html/menu_teacher.html';

                        //javascript:top.frames['right'].location = '../html/requestChem.html';
                        //return true;
                        window.location.href="../html/index.html";
                    }else if($scope.type == 3){
                        alert('เข้าสู่ระบบโดย : '+$scope.session);
                        //javascript:top.frames['left'].location = '../html/menu_operator.html';

                        //javascript:top.frames['right'].location = '../html/requestChem.html';
                        //return true;
                        window.location.href="../html/index.html";
                    }else if($scope.type == 4){
                        alert('เข้าสู่ระบบโดย : '+$scope.session);
                        //javascript:top.frames['left'].location = '../html/menu_scientist.html';

                        //javascript:top.frames['right'].location = '../html/requestChem.html';
                        //return true;
                        window.location.href="../html/index.html";
                    }else{
                        alert('username หรือ password ไม่ถูกต้อง');
                        //javascript:top.frames['left'].location = '../html/menu_index.html';

                        //javascript:top.frames['right'].location = '../html/login.html';
                        //window.location.href="../html/index.html";
                    }
                });

            });
            //-------------------------------------------------------------
        });
    }
    
    $scope.checkSession = function () {
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
                        //alert('บัญชี '+$scope.session+' กำลังใช้งาน');
//                        javascript:top.frames['left'].location = '../html/menu_manager.html';

//                        javascript:top.frames['right'].location = '../html/requestChem.html';
                        //return true;
                    }else if($scope.type == 2){
                        //alert('บัญชี '+$scope.session+' กำลังใช้งาน');
//                        javascript:top.frames['left'].location = '../html/menu_teacher.html';

//                        javascript:top.frames['right'].location = '../html/requestChem.html';
                        //return true;
                    }else if($scope.type == 3){
                        //alert('บัญชี '+$scope.session+' กำลังใช้งาน');
//                        javascript:top.frames['left'].location = '../html/menu_operator.html';

//                        javascript:top.frames['right'].location = '../html/requestChem.html';
                        //return true;
                    }else if($scope.type == 4){
                        //alert('บัญชี '+$scope.session+' กำลังใช้งาน');
//                        javascript:top.frames['left'].location = '../html/menu_scientist.html';

//                        javascript:top.frames['right'].location = '../html/requestChem.html';
                        //return true;
                    }
                    else{
                        //alert('กรุณาเข้าสู่ระบบ');
//                        javascript:top.frames['left'].location = '../html/menu_index.html';

//                        javascript:top.frames['right'].location = '../html/login.html';
                    }
                });

            });
            //-------------------------------------------------------------
    }
    
    })

//  คลังสินค้า  ============================================================================================================
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
    })

//  ยืนยันคำร้องขอ  ========================================================================================================
    .controller('submitRequestController', function($scope,$http) {
        $http({
            method  :   'GET',
            url     :   '../php/select_chemReceipt.php'
        }).then(function(response) {
            $scope.listReciept = response.data;
        });
        $scope.showPopup = function (getdata) {
            $http({
            method  :   'POST',
            url     :   '../php/select_chemdetail.php',
            data    :   {crd_cr_fk: getdata}
            }).then(function(response) {
            $scope.chemdetail = response.data;
                console.log($scope.chemdetail);
            });
        }
    })

//  นำสารเข้า  ============================================================================================================
    .controller('inboundChemController', function($scope,$http) {

        //  เพิ่มสารเคมี
        $scope.addChem = function(){
            //  กดปุ่มเพิ่ม
            $scope.new = false;
            $scope.inbound = false;
        }

        $scope.cancleChem = function(){
            //  กดปุ่มยกเลิก
            //window.location.href="../html/inboundChem.html";
            $scope.new = true;
            $scope.inbound = true;
        }

        //  ยืนยันเพิ่มสาร
        $scope.insertChem = function(){
            console.log($scope.cc_expDt);
            alert("วันที่"+$scope.cc_expDt);
            alert("ยืนยันเพิ่มสาร");

            $http({
                method  : 'POST',
                url     : '../php/insert_chemCategory.php',
                data    : { 
        //                                    crd_cr_fk: response.data[0].cr_pk,
        //                                    crd_cc_fk: value.cc_pk,
        //                                    crd_amt: value.volumeRequest,
        //                                    crd_price: value.cc_price,
        //                                    crd_unit: value.cu_name_abb
                    code : $scope.cc_code,
                    name : $scope.cc_name,
                    type : $scope.cc_type,
                    casNo : $scope.cc_casNo,
                    state : $scope.cc_state,
                    packing : $scope.cc_packing,
                    volume : $scope.cc_volume,
                    unit_fk : $scope.cc_unit_fk.cu_pk,
                    qty : $scope.cc_quantity,
                    loc_fk : $scope.cc_location_fk.cl_pk,
                    room : $scope.cc_room,
                    price : $scope.cc_price,
                    grade : $scope.cc_grade,
                    expDt : $scope.cc_expDt,
                    desc : $scope.cc_desc,
                    producer : $scope.cc_producer

                }, 
                headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
            }).then(function(response) {
                console.log(response);


                alert("ดำเนินการเพิ่มเรียบร้อย");
                //window.location.href="../html/inboundChem.html";
            })   

        }

        $scope.begin = 0;
        $scope.cartlist = [];
        //  จำนวนแสดง
        $scope.options = [{
            name: '5',
            value: 5
        },{
            name: '10',
            value: 10
        }, {
            name: '20',
            value: 20
        }, {
            name: '50',
            value: 50
        }, {
            name: '100',
            value: 100
        }];

        // แสดงโปรเจค
        $http({
            method  :   'GET',
            url     :   '../php/select_chemProject.php'
            }).then(function(response) {
                $scope.listProject = response.data;
        });

        //  แสดงสารเคมี
        $http({
            method  : 'POST',
            url     : '../php/select_chemCategory.php',
            data    : {cl_name: "ดูทั้งหมด"}, //forms user object
            headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
            }).then(function(response) {
                $scope.listChem = response.data;
                console.log($scope.listChem);
        })

        //  แสดงสถานที่
        $http({
            method  : 'POST',
            url     : '../php/select_chemLocation.php',
            headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
            }).then(function(response) {
                $scope.listLoc = response.data;
                console.log($scope.listLoc);
        })

        //  แสดงหน่วย
        $http({
            method  : 'POST',
            url     : '../php/select_chemUnit.php',
            headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
            }).then(function(response) {
                $scope.listUnit = response.data;
                console.log($scope.listUnit);
        })

        //  ปุ่ม prev
        $scope.deleteRecord = function () {
            if(parseInt($scope.begin) - parseInt($scope.searchRange.value) < 0)
                $scope.begin = 0;
            else
                $scope.begin = parseInt($scope.begin) - parseInt($scope.searchRange.value);
        }

        //  ปุ่ม next
        $scope.addRecord = function () {
            if(parseInt($scope.begin) + parseInt($scope.searchRange.value) < $scope.listChem.length)
                    $scope.begin = parseInt($scope.begin) + parseInt($scope.searchRange.value);
        }

        //  เพิ่มใส่ตะกร้า
        $scope.addCart = function (selectedData) {
            $scope.dupp = false;

            if($scope.cartlist.length == 0)
                $scope.cartlist.push(selectedData);
            else {
                angular.forEach($scope.cartlist, function(value, key){
                    if(value == selectedData)
                        $scope.dupp = true;
                });
                if(!$scope.dupp)
                    $scope.cartlist.push(selectedData);
            }

        }

        //  ลดออกจากตะกร้า
        $scope.deleteCart = function(deletedIndex) {
            console.log(deletedIndex);
            $scope.cartlist.splice(deletedIndex,1);
        }

        //  ยืนยันการนำเข้า
        $scope.createRequest = function(){
            $scope.cantRequest = 0;

            angular.forEach($scope.cartlist, function(value, key){            
                if(isNaN(parseInt(value.volumeRequest))){
                    alert("กรุณาระบุจำนวนสาร: "+value.cc_name+" ให้ถูกต้อง");
                    $scope.cantRequest = -1;
                }
    //            else if (parseInt(value.volumeRequest) > parseInt(value.cc_quantity))
    //            {
    //                alert(value.cc_name+" ปริมาณเหลือไม่พอทำการยืม");
    //                $scope.cantRequest = -1;
    //            }
            });


            if($scope.cantRequest == 0 && $scope.cartlist.length != 0){
    //            if($scope.selectedProject === undefined || $scope.selectedProject === null)
    //                {
    //                    alert("กรุณาเลือกโปรเจค");      
    //                }
    //            else{
    //                $http({
    //                method  : 'POST',
    //                url     : '../php/update_chemCategory.php',
    //                data    : { 
    //                    cr_no: "NO.ทดสอบดึง", 
    //                    cr_cp_fk: $scope.selectedProject.cp_pk}, 
    //                headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
    //                    }).then(function(response) {                

                        angular.forEach($scope.cartlist, function(value, key){            
                                $http({
                                    method  : 'POST',
                                    url     : '../php/update_chemCategory.php',
                                    data    : { 
    //                                    crd_cr_fk: response.data[0].cr_pk,
    //                                    crd_cc_fk: value.cc_pk,
    //                                    crd_amt: value.volumeRequest,
    //                                    crd_price: value.cc_price,
    //                                    crd_unit: value.cu_name_abb
                                        cc_pk : value.cc_pk,
                                        cc_quantity : value.volumeRequest

                                    }, 
                                    headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
                                }).then(function(response) {
                                    console.log(response);
                                })    
                            }); 
    //                    })
                    alert("ดำเนินการนำเข้าเรียบร้อย");
                    window.location.href="../html/inboundChem.html";
      //          }

            }else{
                alert("ดำเนินการนำเข้าไม่สำเร็จ");
            }
        }


    })

//  เบิกสาร  ============================================================================================================
    .controller('recieptController', function($scope,$http) {
    $scope.index = "recieptController";
    $scope.begin = 0;
    $scope.cartlist = [];
    $scope.options = [{
        name: '5',
        value: 5
    },{
        name: '10',
        value: 10
    }, {
        name: '20',
        value: 20
    }, {
        name: '50',
        value: 50
    }, {
        name: '100',
        value: 100
    }];
    
    $http({
        method  :   'GET',
        url     :   '../php/select_chemProject.php'
    }).then(function(response) {
        $scope.listProject = response.data;
    });
    
    $http({
        method  : 'POST',
        url     : '../php/select_chemCategory.php',
        data    : {cl_name: "ดูทั้งหมด"}, //forms user object
        headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
    }).then(function(response) {
        $scope.listChem = response.data;
    })
    
    $scope.deleteRecord = function () {
        if(parseInt($scope.begin) - parseInt($scope.searchRange.value) < 0)
            $scope.begin = 0;
        else
            $scope.begin = parseInt($scope.begin) - parseInt($scope.searchRange.value);
    }
    
    $scope.addRecord = function () {
        if(parseInt($scope.begin) + parseInt($scope.searchRange.value) < $scope.listChem.length)
                $scope.begin = parseInt($scope.begin) + parseInt($scope.searchRange.value);
    }
    
    $scope.addtCart = function (selectedData) {
        $scope.dupp = false;
        if($scope.cartlist.length == 0)
            $scope.cartlist.push(selectedData);
        else {
            angular.forEach($scope.cartlist, function(value, key){
                if(value == selectedData)
                    $scope.dupp = true;
            });
            if(!$scope.dupp)
                $scope.cartlist.push(selectedData);
        }
    }
    
    $scope.deleteCart = function(deletedIndex) {
        $scope.cartlist.splice(deletedIndex,1);
    }    
    
    $scope.pricecal = function(index){
         $scope.total = 0;
        //อัลกอแปลงหน่วย
        if($scope.cartlist[index].cu_name_abb == "kg"){
            if($scope.cartlist[index].unitRequest == "kg"){
                $scope.cartlist[index].totalprice = $scope.cartlist[index].volumeRequest*$scope.cartlist[index].cc_price;
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest;
            }
            else if($scope.cartlist[index].unitRequest == "mg"){
                $scope.cartlist[index].totalprice = $scope.cartlist[index].volumeRequest/1000/1000*$scope.cartlist[index].cc_price;
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest/1000/1000;
            }
            else if($scope.cartlist[index].unitRequest == "g"){
                $scope.cartlist[index].totalprice = $scope.cartlist[index].volumeRequest/1000*$scope.cartlist[index].cc_price;
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest/1000;
            }
            else
                $scope.cartlist[index].totalprice = 0;
        }
        else if($scope.cartlist[index].cu_name_abb == "g"){
            if($scope.cartlist[index].unitRequest == "kg"){
                $scope.cartlist[index].totalprice = $scope.cartlist[index].volumeRequest*1000*$scope.cartlist[index].cc_price;
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest*1000;
            }
            else if($scope.cartlist[index].unitRequest == "mg"){
                $scope.cartlist[index].totalprice = $scope.cartlist[index].volumeRequest/1000*$scope.cartlist[index].cc_price;
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest/1000;
            }
            else if($scope.cartlist[index].unitRequest == "g"){
                $scope.cartlist[index].totalprice = $scope.cartlist[index].volumeRequest*$scope.cartlist[index].cc_price;
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest;
            }
            else
                $scope.cartlist[index].totalprice = 0;
        }
        else if($scope.cartlist[index].cu_name_abb == "mg"){
            if($scope.cartlist[index].unitRequest == "kg"){
                $scope.cartlist[index].totalprice = $scope.cartlist[index].volumeRequest*1000*1000*$scope.cartlist[index].cc_price;
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest*1000*1000;
            }
            else if($scope.cartlist[index].unitRequest == "mg"){
                $scope.cartlist[index].totalprice = $scope.cartlist[index].volumeRequest*$scope.cartlist[index].cc_price;
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest;
            }
            else if($scope.cartlist[index].unitRequest == "g"){
                $scope.cartlist[index].totalprice = $scope.cartlist[index].volumeRequest*1000*$scope.cartlist[index].cc_price;
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest*1000;
            }
            else
                $scope.cartlist[index].totalprice = 0;
        }
        else if($scope.cartlist[index].cu_name_abb == "l"){
            if($scope.cartlist[index].unitRequest == "l"){
                $scope.cartlist[index].totalprice = $scope.cartlist[index].volumeRequest*$scope.cartlist[index].cc_price;
            }
            else if($scope.cartlist[index].unitRequest == "ml"){
                $scope.cartlist[index].totalprice = $scope.cartlist[index].volumeRequest/1000*$scope.cartlist[index].cc_price;
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest/1000;
            }
            else
                $scope.cartlist[index].totalprice = 0;
        }
        else if($scope.cartlist[index].cu_name_abb == "ml"){
            if($scope.cartlist[index].unitRequest == "l"){
                $scope.cartlist[index].totalprice = $scope.cartlist[index].volumeRequest*1000*$scope.cartlist[index].cc_price;
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest*1000;
            }
            else if($scope.cartlist[index].unitRequest == "ml"){
                $scope.cartlist[index].totalprice = $scope.cartlist[index].volumeRequest*$scope.cartlist[index].cc_price;
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest;
            }
            else
                $scope.cartlist[index].totalprice = 0;
        }
        angular.forEach($scope.cartlist, function(value, key){  
            $scope.total = $scope.total + value.totalprice;
        });
    }
    
    $scope.createRequest = function(){
        $scope.cantRequest = 0;
        //ตรวจสอบความถูกต้อง
        
        if($scope.cartlist.length == 0){
            alert("ไม่มีรายการสินค้า");
            $scope.cantRequest = -1;
        }
        else{
            angular.forEach($scope.cartlist, function(value, key){     
                if(isNaN(parseInt(value.volumeRequest))){
                    alert("กรุณาระบุจำนวนสาร: "+value.cc_name+" ให้ถูกต้อง");
                    $scope.cantRequest = -1;
                }
                else if(value.exvolumeRequest > value.volumeRequest){
                    alert("สาร "+value.cc_name+" มีปริมาณไม่เพียงพอ");
                    $scope.cantRequest = -1;
                }else {
                    //ตรวจสอบหน่วย
                    if(value.cu_name_abb == "kg" || value.cu_name_abb == "g" || value.cu_name_abb == "mg"){
                        if(value.unitRequest == "l" || value.unitRequest == "ml"){
                            alert("หน่วยของสาร "+value.cc_name+" ที่ทำการยืมไม่ถูกต้อง");
                            $scope.cantRequest = -1;
                        }
                    }
                    else
                    {
                        if(value.cu_name_abb == "kg" || value.cu_name_abb == "g" || value.cu_name_abb == "mg"){
                            alert("หน่วยของสาร "+value.cc_name+" ที่ทำการยืมไม่ถูกต้อง");
                            $scope.cantRequest = -1;
                        }
                    }
                }
            });
            
            if($scope.selectedProject == undefined || $scope.selectedProject == null)
            {
                alert("กรุณาเลือกโปรเจค");     
                $scope.cantRequest = -1;
            }
            else{
                if($scope.selectedProject.cp_budget-$scope.total < 0){
                    alert("ยอดเงินคงเหลือในโปรเจคไม่เพียงพอ");
                    $scope.cantRequest = -1;
                }
            }
        }
        
        if($scope.cantRequest == -1){
            alert("ดำเนินการยืมไม่สำเร็จ");
        }
        else{
            $http({
                method  : 'POST',
                url     : '../php/insert_reciept.php',
                data    : { cr_no: "NO.ทดสอบดึง", cr_cp_fk: $scope.selectedProject.cp_pk}, 
                headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
                    }).then(function(response) {                

                    angular.forEach($scope.cartlist, function(value, key){            
                            $http({
                                method  : 'POST',
                                url     : '../php/insert_recieptDetail.php',
                                data    : { crd_cr_fk: response.data[0].cr_pk,
                                            crd_cc_fk: value.cc_pk,
                                            crd_amt: value.exvolumeRequest,
                                            crd_price: value.totalprice,
                                            crd_unit: value.cu_name_abb}, 
                                headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
                            }).then(function(response) {
                                console.log(response);
                            })    
                        }); 
                    })
                alert("ดำเนินการเพิ่มรายการเรียบร้อย");
        }
    }  
})

//  project  ============================================================================================================
    .controller('projectController', function($scope,$http) {
        $scope.index = "projectController";

        $http({
            method  :   'GET',
            url     :   '../php/select_chemProject.php'
        }).then(function(response) {
            $scope.listProject = response.data;
        });

        //    เลือกประเภทผู้ใช้ที่เป็น teacher
        $http({
            method  :   'GET',
            url     :   '../php/select_teacher_pk.php'
        }).then(function(response) {
            $scope.teacher_pk = response.data[0].cat_pk;
            console.log("teacher_pk : "+$scope.teacher_pk);

                $http({
                    method  :   'POST',
                    url     :   '../php/select_teacher.php',
                    data    : { teacher_pk : $scope.teacher_pk}
                }).then(function(response) {
                    $scope.listTeacher = response.data;
                    console.log($scope.listTeacher);
                });
        });

        //  สร้างโปรเจค
        $scope.createProject = function(){
            $http.post("../php/insert_project.php",{
                'teacher_pk' : $scope.teacher.ca_cat_fk,
                'name' : $scope.cp_name, 
                'budget' : $scope.cp_budget,
                'desc' : $scope.cp_desc
                }).success(function (data, status, headers, config) {
                    console.log(data);

                    alert("เพิ่มโปรเจคเรียบร้อย");
                    window.location.href="../html/addProject.html";
                });
        }

        //  ยกเลิก
        $scope.cancleProject = function(){
            window.location.href="../html/addProject.html";
        }    
    }) 


//  member  ============================================================================================================
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
    })

//  edit member  =========================================================================================================
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
            //window.location.href="../html/index.html";
            //window.location.href = "#/editMember";
            //location.reload(true);
            $scope.checked = true; 
            $scope.dis = true; 
            $scope.btng1 = true; 
            $scope.btng2 = true; 
            $scope.btng3 = true; 
            $scope.fix = true;
        }
        
        //    เลือกผู้ใช้
        $http({
            method  :   'POST',
            url     :   '../php/select_account_where.php',
            data    : { ca_user: "manager"}, 
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
    
        
    })

//  แก้ไขข้อมูลสารเคมี  =======================================================================================================
    .controller('editChemController', function($scope,$http, $filter) {
    
        //  ปุ่ม prev
        $scope.deleteRecord = function () {
            if(parseInt($scope.begin) - parseInt($scope.searchRange.value) < 0)
                $scope.begin = 0;
            else
                $scope.begin = parseInt($scope.begin) - parseInt($scope.searchRange.value);
        }

        //  ปุ่ม next
        $scope.addRecord = function () {
            if(parseInt($scope.begin) + parseInt($scope.searchRange.value) < $scope.listChem.length)
                    $scope.begin = parseInt($scope.begin) + parseInt($scope.searchRange.value);
        }
        
        $scope.begin = 0;
        $scope.cartlist = [];
        //  จำนวนแสดง
        $scope.options = [{
            name: '5',
            value: 5
        },{
            name: '10',
            value: 10
        }, {
            name: '20',
            value: 20
        }, {
            name: '50',
            value: 50
        }, {
            name: '100',
            value: 100
        }];
    
        // แสดงโปรเจค
        $http({
            method  :   'GET',
            url     :   '../php/select_chemProject.php'
            }).then(function(response) {
                $scope.listProject = response.data;
        });

        //  แสดงสารเคมี
        $http({
            method  : 'POST',
            url     : '../php/select_chemCategory.php',
            data    : {cl_name: "ดูทั้งหมด"}, //forms user object
            headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
            }).then(function(response) {
                $scope.listChem = response.data;
                console.log($scope.listChem);
        })

        //  แสดงสถานที่
        $http({
            method  : 'POST',
            url     : '../php/select_chemLocation.php',
            headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
            }).then(function(response) {
                $scope.listLoc = response.data;
                console.log($scope.listLoc);
        })

        //  แสดงหน่วย
        $http({
            method  : 'POST',
            url     : '../php/select_chemUnit.php',
            headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
            }).then(function(response) {
                $scope.listUnit = response.data;
                console.log($scope.listUnit);
        })
        
        //  เลือกสารเคมีที่จะแก้ไข
        $scope.addCart = function (selectedData) {
            $scope.cc_name = selectedData.cc_name;
            $scope.cc_type = selectedData.cc_type;
            $scope.cc_code = selectedData.cc_code;
            $scope.cc_casNo = selectedData.cc_casNo;
            $scope.cc_state = selectedData.cc_state;
            $scope.cc_volume = selectedData.cc_volume;
            $scope.cc_unit_fk = selectedData.cu_pk;
            $scope.cc_quantity = selectedData.cc_quantity;
            $scope.cc_packing = selectedData.cc_packing;
            $scope.cc_location_fk = selectedData.cl_pk;
            $scope.cc_room = selectedData.cc_room;
            $scope.cc_price = selectedData.cc_price;
            $scope.cc_grade = selectedData.cc_grade;
            $scope.cc_expDt = new Date(selectedData.cc_expDt);
            $scope.cc_producer = selectedData.cc_producer;
            $scope.cc_desc = selectedData.cc_desc;
        }
        
        //  ยืนยันสารเคมีที่จะแก้ไข
        $scope.updateChem = function (selectedData) {
            alert("แก้ไขข้อมูลเรียบร้อย");

        }
    })

//  route  ============================================================================================================
    .config(['$routeProvider',

	function($routeProvider) {
      $routeProvider
          .when(
            '/',{
                templateUrl: '../html/news.html',
                controller: 'loginController'
          }
          ).when(
            '/contact',{
                templateUrl: '../html/contact.html'
          }
          ).when(
            '/requestChem',{
                templateUrl: '../html/requestChem.html', 
                controller:  'submitRequestController'
          }
          ).when(
            '/inboundChem',{
                templateUrl: '../html/inboundChem.html',
                controller:  'inboundChemController'

            }
          ).when(
            '/viewReciept',{
                templateUrl: '../html/viewReciept.html',
                controller: 'recieptController'
            }
          ).when(
            '/sold',{
                templateUrl: '../html/sold.html',
                controller: 'soldController'
            }
          ).when(
            '/viewProject',{
                templateUrl: '../html/viewProject.html',
                controller: 'projectController'
            } 
          ).when(
            '/transfer',{
                templateUrl: '../html/transfer.html',
                controller: 'transferController'
            } 
          ).when(
            '/editChem',{
                templateUrl: '../html/editChem.html',
                controller: 'editChemController'
            } 
          ).when(
            '/importlog',{
                templateUrl: '../html/importlog.html',
                controller: 'importlogController'
            }
          ).when(
            '/withdrawlog',{
                templateUrl: '../html/withdrawlog.html',
                controller: 'withdrawlogController'
           } 
          ).when(
            '/salelog',{
                templateUrl: '../html/salelog.html',
                controller: 'salelogController'
            }  
          ).when(
            '/viewStock',{
                templateUrl: '../html/viewStock.html',
                controller: 'namesCtrl'
            }  
          ).when(
            '/addMember',{
                templateUrl: '../html/addMember.html',
                controller: 'membersController'
            }  
          ).when(
            '/editMember',{
                templateUrl: '../html/editMember.html',
                controller: 'editmembersCtrl'
            }  
          ).when(
            '/addProject',{
                templateUrl: '../html/addProject.html',
                controller: 'projectController'
            } 
           ).when(
            '/login',{
                templateUrl: 'login.html',
                controller: 'loginController'
            }   
          ).otherwise({
                redirectTo: '/'
      	  });
      	  
}]);
