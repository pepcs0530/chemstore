//  Login   ============================================================================================================
chemstore.controller('loginCtrl', function($scope,$http,$timeout) {
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
    
        //  Notifications
        $scope.startTimer = function () {
            $scope.noti();
            setInterval($scope.noti, 1000);
        }
        
        $scope.noti = function () {
            $http({
                method  :   'GET',
                url     :   '../php/noti.php'
            }).then(function(response) {
                $scope.requestChemNoti = parseInt(response.data[0]);
                $scope.requestChemIncreaseNoti = parseInt(response.data[1]);
                $scope.requestOtherNoti = parseInt(response.data[2]);
                $scope.sumNoti = parseInt($scope.requestChemNoti) + parseInt($scope.requestChemIncreaseNoti) + parseInt($scope.requestOtherNoti);
            });
        }
        
        window.onload = function(){
          $scope.startTimer();
        };
    
    })

//  คลังสินค้า  ============================================================================================================
    .controller('categoryCtrl', function($scope,$http) {
        $scope.begin = 0;
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
    
        $scope.deleteRecord = function () {
            if(parseInt($scope.begin) - parseInt($scope.searchRange.value) < 0)
                $scope.begin = 0;
            else
                $scope.begin = parseInt($scope.begin) - parseInt($scope.searchRange.value);
        }
    
        $scope.addRecord = function () {
            console.log(parseInt($scope.begin) + parseInt($scope.searchRange.value) < $scope.listChem.length);
            if(parseInt($scope.begin) + parseInt($scope.searchRange.value) < $scope.listChem.length)
                    $scope.begin = parseInt($scope.begin) + parseInt($scope.searchRange.value);
        }
    
        $http({
            method  :   'GET',
            url     :   '../php/select_chemLocation.php',
        }).then(function(response) {
            $scope.listLocation = response.data;
            console.log($scope.listLocation);
        });
        $scope.selectData = "จุฬาภรณ์1";
        $http({
            method  : 'POST',
            url     : '../php/select_chemCategory.php',
            data    : {cl_name: "ดูทั้งหมด"}, //forms user object
            headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
        }).then(function(response) {
            $scope.listChem = response.data;
        })
    })

//  ยืนยันคำร้องขอ  ========================================================================================================
    .controller('submitRequestCtrl', function($scope,$http) {
        $http({
            method  :   'POST',
            url     :   '../php/select_chemReceipt.php',
            data    :   {findthis : "ดูทั้งหมด"}
        }).then(function(response) {
            $scope.listReciept = response.data;
            console.log($scope.listReciept);
        });
        $scope.showPopup = function (getdata,index) {
            $scope.index = index;
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
    .controller('inboundChemCtrl', function($scope,$http) {
        //  แสดงสถานที่
    
        $scope.addChem = {cc_state : "S",
                          cl_pk : "1",
                          cu_pk :"1",
                          cc_expDt: new Date()}


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
        
        $scope.cancleChem = function(){
            $scope.addChem = "";
        }
        
        //  ยืนยันเพิ่มสาร
        $scope.insertChem = function(){
            $http({
                method  : 'POST',
                url     : '../php/insert_chemCategory.php',
                data    : { 
                    code : $scope.addChem.cc_code,
                    name : $scope.addChem.cc_name,
                    type : $scope.addChem.cc_type,
                    casNo : $scope.addChem.cc_casNo,
                    state : $scope.addChem.cc_state,
                    packing : $scope.addChem.cc_packing,
                    volume : $scope.addChem.cc_volume,
                    unit_fk : $scope.addChem.cc_unit_fk.cu_pk,
                    qty : $scope.addChem.cc_quantity,
                    loc_fk : $scope.addChem.cc_location_fk.cl_pk,
                    room : $scope.addChem.cc_room,
                    price : $scope.addChem.cc_price,
                    grade : $scope.addChem.cc_grade,
                    expDt : $scope.addChem.cc_expDt,
                    desc : $scope.addChem.cc_desc,
                    producer : $scope.addChem.cc_producer

                }, 
                headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
            }).then(function(response) {
                console.log(response);
                alert("ดำเนินการเพิ่มเรียบร้อย");
                $scope.addChem = "";
            })   
        }
    })

//  เบิกสาร  ============================================================================================================
    .controller('recieptCtrl', function($scope,$http) {
    $scope.cartlist = [];
    $scope.begin = 0;
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
        method  :   'POST',
        url     :   '../php/select_chemProject.php',
        data    :   {teacher_pk : $scope.key},
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
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
                    cr_no : "NO."+ $scope.key +
                     $scope.selectedProject.cp_pk +
                      new Date().getMinutes() +
                      new Date().getHours() +
                      new Date().getDate() + 
                     (new Date().getMonth()+1) + 
                      new Date().getFullYear(), 
                    cr_cp_fk : $scope.selectedProject.cp_pk,
                    totalmoney : $scope.total},
                    
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

// project  ============================================================================================================
    .controller('projectCtrl', function($scope,$http) {
        //    เลือกประเภทผู้ใช้ที่เป็น teacher
        //    สร้างโปรเจค
        $scope.addProject = {teacher : $scope.session,
                             teacher_pk : $scope.key}
        
        //    สร้างโปรเจค
        $http({
        method  : 'POST',
        url     : '../php/select_chemProject.php',
        data    : { 
            teacher_pk : $scope.addProject.teacher_pk}, 
            headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
        }).then(function(response) {                
            $scope.listProject = response.data;
        })
        
        $http({
            method  :   'POST',
            url     :   '../php/select_account_where.php',
            data    : { ca_pk: $scope.key}, 
            headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
                    }
        ).then(function(response) {
            $scope.listAcountData = response.data;
        });
        
        $scope.createProject = function(){
            $http({
                method  : 'POST',
                url     : '../php/insert_project.php',
                data    : {teacher_pk: $scope.addProject.teacher_pk,
                           name: $scope.addProject.cp_name,
                           budget: $scope.addProject.cp_budget,
                           desc: $scope.addProject.cp_desc,
                           teacher_budget : $scope.listAcountData[0].ca_credit-$scope.addProject.cp_budget}, //forms user object
                headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
            }).then(function(data) {
                console.log(data);
                alert("เพิ่มโปรเจคเรียบร้อย");
                $scope.addProject = {teacher : $scope.session,
                                     teacher_pk : $scope.key}
            });
        }
        //  ยกเลิก
        $scope.cancleProject = function(){
            $scope.addProject = {teacher : $scope.session,
                                 teacher_pk : $scope.key}
        }    
    }) 

// add project  ============================================================================================================
    .controller('addProjectCtrl', function($scope,$http) {
        //    เลือกประเภทผู้ใช้ที่เป็น teacher
        //    สร้างโปรเจค
        $scope.addProject = {teacher : $scope.session,
                             teacher_pk : $scope.key}
        
        $http({
            method  :   'POST',
            url     :   '../php/select_account_where.php',
            data    : { ca_pk: $scope.key}, 
            headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
                    }
        ).then(function(response) {
            $scope.listAcountData = response.data;
        });
        
        $scope.createProject = function(){
            $http({
                method  : 'POST',
                url     : '../php/insert_project.php',
                data    : {teacher_pk: $scope.addProject.teacher_pk,
                           name: $scope.addProject.cp_name,
                           budget: $scope.addProject.cp_budget,
                           desc: $scope.addProject.cp_desc,
                           teacher_budget : $scope.listAcountData[0].ca_credit-$scope.addProject.cp_budget}, //forms user object
                headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
            }).then(function(data) {
                console.log(data);
                alert("เพิ่มโปรเจคเรียบร้อย");
                $scope.addProject = {teacher : $scope.session,
                                     teacher_pk : $scope.key}
            });
        }
        //  ยกเลิก
        $scope.cancleProject = function(){
            $scope.addProject = {teacher : $scope.session,
                                 teacher_pk : $scope.key}
        }    
    }) 

//  member  ============================================================================================================
    .controller('membersCtrl', function($scope,$http) {
        //    เลือกประเภทผู้ใช้
        $http({
            method  :   'GET',
            url     :   '../php/select_accoountType.php'
        }).then(function(response) {
            $scope.listAcountType = response.data;
        });
    
        $scope.addMember = {
            acctyp : "4"
        }
        //     ล้างค่า
        $scope.clearMember = function(){
            $scope.addMember = {acctyp : "4"}
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
                'acctyp' : $scope.addMember.acctyp
            }).success(function (data) {
                console.log(data);
                if(data.substring(data.length-55,data.length-38) == "Error : Duplicate"){
                    alert("มี username นี้อยู่ในระบบแล้ว");
                }else{
                    alert("เพิ่มสมาชิกเรียบร้อย"); 
                    $scope.addMember = {acctyp : "4"};
                }
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
                location.reload();
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
    .controller('editChemCtrl', function($scope,$http, $filter) {
    
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
                });
        }
    })

//  ย้ายคลัง  ============================================================================================================
    .controller('transferChemCtrl', function($scope,$http, $filter) {     
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
    .controller('importlogCtrl', function($scope,$http) {
        //  แสดงใบเบิกสาร
        $http({
            method  :   'GET',
            url     :   '../php/select_import.php'
        }).then(function(response) {
            $scope.listImport = response.data;
        });
    })

//  ประวัติการเบิกสาร  ============================================================================================================
    .controller('withdrawlogCtrl', function($scope,$http) {
        //  แสดงใบเบิกสาร    
        console.log($scope.key+":"+$scope.type);
        $http({
                method  :   'POST',
                url     :   '../php/select_withdraw.php',
                data    :   {
                    findthis: $scope.key,
                    findtypethis: $scope.type
                }
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
//  สถานะคำร้องขอของอาจารย์  ============================================================================================================
    .controller('teacherRequestCtrl', function($scope,$http) {

        $http({
            method  :   'POST',
            url     :   '../php/select_chemReceipt.php',
            data    :   {findthis: $scope.key}
        }).then(function(response) {
            $scope.ListReciept = response.data;
        });
        $scope.showPopup = function (getdata) {
            $http({
            method  :   'POST',
            url     :   '../php/select_chemdetail.php',
            data    :   {crd_cr_fk: getdata}
        }).then(function(response) {
            $scope.chemdetail = response.data;
        });
        }
    })

//  คำร้องขออื่นๆ  ============================================================================================================
    .controller('requestOtherCtrl', function($scope,$http) {

        //  สร้างคำร้องอื่นๆ
        $scope.createRequestOther = function(){
            $http({
                method  : 'POST',
                url     : '../php/insert_requestOther.php',
                data    : {
                            cro_desc : $scope.cro_desc,
                            cro_ca_fk : $scope.key
                }, 
                headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
            }).then(function(data) {
                console.log(data);
                alert("ส่งคำร้องอื่นๆ เรียบร้อย");
                $scope.cro_desc = "";
            });
        }
        
        //  ยกเลิก
        $scope.cancleRequestOther = function(){
            $scope.cro_desc = "";
        }  
        
        //  แสดงคำร้องอื่นๆ ทั้งหมด
        $scope.showPopup = function () {
            $http({
            method  :   'POST',
            url     :   '../php/select_requestOther.php',
            data    :   { 
                    findthis: $scope.key
                }
            }).then(function(response) {
                $scope.ListRequestOther = response.data;
            });
        }
    })

//  จัดการคำร้องขออื่นๆ  ============================================================================================================
    .controller('manageRequestOtherCtrl', function($scope,$http) {
        $http({
            method  :   'POST',
            url     :   '../php/select_manageRequestOther.php'
        }).then(function(response) {
            $scope.listManageRequestOther = response.data;
        });
    
        $scope.showPopup = function (getdata) {
            $http({
            method  :   'POST',
            url     :   '../php/select_manageOneRequestOther.php',
            data    :   {cro_pk: getdata}
            }).then(function(response) {
                $scope.listOneRequestOther = response.data;
            });
            
            $scope.confirmRequestOther = function(){
                $http.post("../php/update_manageOneRequestOther.php",{
                    'cro_pk' : getdata
                }).success(function (data) {
                    alert("ยืนยันคำร้องเรียบร้อย");
                    location.reload();
                });
            }
        }
        
        
    })
