angular.module('chemstore', []).controller('inboundChemController', function($scope,$http) {

    //  เพิ่มสารเคมี
    $scope.addChem = function(){
        //  กดปุ่มเพิ่ม
        $scope.new = false;
        $scope.inbound = false;
    }
    
    $scope.cancleChem = function(){
        //  กดปุ่มยกเลิก
        window.location.href="../html/inboundChem.html";
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
     
    
});