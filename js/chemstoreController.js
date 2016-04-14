//  Login   ============================================================================================================
chemstore.controller('loginController', function($scope,$http,$timeout) {
    $scope.createLogin = function () {    
        $http({
            method  :   'POST',
            url     :   '../php/createSession.php',
            data    :   {ca_user: $scope.login.username,ca_pass: $scope.login.password}
        }).then(function(response) {
            console.log(response.data);
            if(response.data == "true"){
                alert("ยินดิต้อนรับเข้าสู่ระบบ");
                location.reload();
            }else{
                alert("usernameหรือpasswordไม่ถูกต้อง");
            }
        });
    }
    
    $scope.checkSession = function () {
        //-------------------------------------------------------------
            $http({
                method  :   'GET',
                url     :   '../php/getType.php'
            }).then(function(response) {
                $scope.type = response.data;
//                console.log($scope.type);
            });
            $http({
                method  :   'GET',
                url     :   '../php/getSession.php'
            }).then(function(response) {
                $scope.session = response.data;
//                console.log($scope.session);
            });
            $http({
                method  :   'GET',
                url     :   '../php/getKey.php'
            }).then(function(response) {
                $scope.key = response.data;
//                console.log($scope.key);
            });
    }
        $scope.myInterval = 3000;
        
        $scope.slides = [
        {
          image: '../img/slide1.jpg'
        },
        {
          image: '../img/slide2.jpg'
        },
        {
          image: '../img/slide3.jpg'
        },
        {
          image: '../img/slide4.jpg'
        }
        ];
    
    })

//  คลังสินค้า  ============================================================================================================
    .controller('categoryController', function($scope,$http) {
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
                location.reload();
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
                                
                                //  เพิ่มประวัติการนำเข้าสาร
                                $http.post("../php/insert_import.php",{
                                    cc_pk : value.cc_pk
                                }).success(function (data, status, headers, config) {
                                    console.log(data);
                                })
                            }); 
    //                    })
                    alert("ดำเนินการนำเข้าเรียบร้อย");
                    //window.location.href="../html/inboundChem.html";
                    location.reload();
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
                data    : { 
                    cr_no : $scope.cr_no, 
                    cr_cp_fk : $scope.selectedProject.cp_pk}, 
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
        //    เลือกประเภทผู้ใช้ที่เป็น teacher
        $http({
            method  :   'GET',
            url     :   '../php/select_teacher.php'
        }).then(function(response) {
            $scope.listTeacher = response.data;
        });

        //  สร้างโปรเจค
        $scope.createProject = function(){
            $http.post("../php/insert_project.php",{
                'teacher_pk' : $scope.addProject.teacher.ca_pk,
                'name' : $scope.addProject.cp_name, 
                'budget' : $scope.addProject.cp_budget,
                'desc' : $scope.addProject.cp_desc
                }).success(function (data, status, headers, config) {
                    alert("เพิ่มโปรเจคเรียบร้อย");
                    $scope.addProject = "";
                });
        }

        //  ยกเลิก
        $scope.cancleProject = function(){
            $scope.addProject = "";
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
            $scope.addMember = "";
        }
        
        //      เพิ่มสมาชิก
        $scope.createMember = function(){   
            $http.post("../php/create_member.php",{
                'code' : $scope.addMember.code, 
                'user' : $scope.addMember.user, 
                'pass' : $scope.addMember.pass, 
                'tname' : $scope.addMember.tname,
                'fname' : $scope.addMember.fname,
                'lname' : $scope.addMember.lname,
                'tel' : $scope.addMember.tel,
                'acctyp' : $scope.addMember.acctyp.cat_pk
            }).success(function (data) {
                    alert("เพิ่มสมาชิกเรียบร้อย");
                    $scope.addMember = "";
                });
        }
    })

//  edit member  =========================================================================================================
    .controller('editmembersCtrl', function($scope,$http) {
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
            data    : { ca_pk: $scope.key}, 
            headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
                    }
        ).then(function(response) {
            $scope.listAcountData = response.data[0];
        });
    
        //  ยืนยันแก้ไขข้อมูลส่วนตัว
        $scope.updateMember = function(){
            $http.post("../php/update_member.php",{
                'pk' : $scope.listAcountData.ca_pk, 
                'code' : $scope.listAcountData.ca_code, 
                'tname' : $scope.listAcountData.ca_tname, 
                'fname' : $scope.listAcountData.ca_fname, 
                'lname' : $scope.listAcountData.ca_lname, 
                'tel' : $scope.listAcountData.ca_tel, 
            }).success(function (data) {
                    alert("แก้ไขสมาชิกเรียบร้อย");
//                    location.reload();
            });
        }
    
        //  ยืนยันแก้ไขรหัสผ่าน
        $scope.updatePassMember = function(){
            if($scope.pass != $scope.listAcountData.ca_pass){
                alert("รหัสผ่านไม่ถูกต้อง / ไม่ได้กรอกรหัสผ่าน");
            }else{
                if($scope.new_pass != $scope.re_new_pass){
                    alert("รหัสผ่านใหม่ไม่สอดคล้องกัน");
                }else{
                    $http.post("../php/update_passMember.php",{
                        'pk' : $scope.listAcountData.ca_pk, 
                        'pass' : $scope.new_pass
                    }).success(function (data) {
                        console.log(data);
                        alert("แก้ไขรหัสผ่านเรียบร้อย");
                        location.reload();
                    });  
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

        $scope.test = function(data) {
            console.log(data);
        }
    
        //  แสดงสารเคมี
        $http({
            method  : 'POST',
            url     : '../php/select_chemCategory.php',
            data    : {cl_name: "ดูทั้งหมด"}, //forms user object
            headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
            }).then(function(response) {
                $scope.listChem = response.data;
        })

        //  แสดงสถานที่
        $http({
            method  : 'POST',
            url     : '../php/select_chemLocation.php',
            headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
        }).then(function(response) {
            $scope.listLoc = response.data;
        })

        //  แสดงหน่วย
        $http({
            method  : 'POST',
            url     : '../php/select_chemUnit.php',
            headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
            }).then(function(response) {
                $scope.listUnit = response.data;
        })
        
        //  เลือกสารเคมีที่จะแก้ไข
        $scope.editThis = function (selectedData) {
            $scope.editThisData = selectedData;
            $scope.editThisData.cc_expDt = new Date($scope.editThisData.cc_expDt);
        }
        
        //  ยืนยันสารเคมีที่จะแก้ไข
        $scope.updateChem = function () {
            $http.post("../php/update_chem.php",{
                
                'cc_pk' : $scope.editThisData.cc_pk,
                'cc_code' : $scope.editThisData.cc_code,
                'cc_name' : $scope.editThisData.cc_name,
                'cc_type' : $scope.editThisData.cc_type,
                'cc_casNo' : $scope.editThisData.cc_casNo,
                'cc_state' : $scope.editThisData.cc_state,
                'cc_volume' : $scope.editThisData.cc_volume,
                'cc_unit_fk' : $scope.editThisData.cu_pk,
                'cc_quantity' : $scope.editThisData.cc_quantity,
                'cc_packing' : $scope.editThisData.cc_packing,
                'cc_location_fk' : $scope.editThisData.cl_pk,
                'cc_room' : $scope.editThisData.cc_room,
                'cc_price' : $scope.editThisData.cc_price,
                'cc_grade' : $scope.editThisData.cc_grade,
                'cc_expDt' : $scope.editThisData.cc_expDt,
                'cc_producer' : $scope.editThisData.cc_producer,
                'cc_desc' : $scope.editThisData.cc_desc,
                
                }).success(function (data, status, headers, config) {
                    console.log(data);
                    alert("แก้ไขข้อมูลเรียบร้อย");
                    jQuery('#myModal').modal('hide');
                    //location.reload();
                });

        }
    })

//  ย้ายคลัง  ============================================================================================================
    .controller('transferChemController', function($scope,$http, $filter) {     
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
        
        //  เลือกสารเคมีที่จะแก้ไข
        $scope.addCart = function (selectedData) {
            $scope.cc_pk = selectedData.cc_pk;
            $scope.cc_name = selectedData.cc_name;
            $scope.cc_type = selectedData.cc_type;
            $scope.cc_code = selectedData.cc_code;
            $scope.cc_casNo = selectedData.cc_casNo;
            $scope.cc_loc_name = selectedData.cl_name;
            $scope.cc_location_fk = selectedData.cl_pk;
            $scope.cc_desc = selectedData.cc_desc;
        }
        
        //  ยืนยันย้ายคลังสารเคมี
        $scope.updateTransfLocChem = function () {
            //alert("แก้ไขข้อมูลเรียบร้อย");
            $http.post("../php/update_transferLocChem.php",{
                
                'cc_pk' : $scope.cc_pk,
                'cc_location_fk' : $scope.cc_location_fk,
                'cc_desc' : $scope.cc_desc,
                
                }).success(function (data, status, headers, config) {
                    console.log(data);

                    alert("แก้ไขข้อมูลเรียบร้อย");
                    location.reload();
                });

        }
    })

//  ประวัติการนำเข้าสาร  ============================================================================================================
    .controller('importlogController', function($scope,$http) {
        //  แสดงใบเบิกสาร
        $http({
            method  :   'GET',
            url     :   '../php/select_import.php'
        }).then(function(response) {
            $scope.listImport = response.data;
        });
    })

//  ประวัติการเบิกสาร  ============================================================================================================
    .controller('withdrawlogController', function($scope,$http) {
        //  แสดงใบเบิกสาร
        $http({
            method  :   'GET',
            url     :   '../php/select_withdraw.php'
        }).then(function(response) {
            $scope.listReciept = response.data;
        });
    
        $scope.addCart = function (selectedData) {
            $scope.crd_cr_pk = selectedData.cr_pk;
            
            //  แสดงใบเบิกสาร
            $http({
                method  :   'POST',
                url     :   '../php/select_withdrawDetail.php',
                data    :   {
                    'crd_cr_pk' : $scope.crd_cr_pk
                }
            }).then(function(response) {
                $scope.listRecieptDetail = response.data;
            });
        }
    })

