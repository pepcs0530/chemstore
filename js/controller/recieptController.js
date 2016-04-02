angular.module('chemstore', []).controller('recieptController', function($scope,$http) {
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
        console.log(deletedIndex);
        $scope.cartlist.splice(deletedIndex,1);
    }    
    
    $scope.createRequest = function(){
        $scope.cantRequest = 0;
        
        angular.forEach($scope.cartlist, function(value, key){            
            if(isNaN(parseInt(value.volumeRequest))){
                alert("กรุณาระบุจำนวนสาร: "+value.cc_name+" ให้ถูกต้อง");
                $scope.cantRequest = -1;
            }
            else if (parseInt(value.volumeRequest) > parseInt(value.cc_quantity))
            {
                alert(value.cc_name+" ปริมาณเหลือไม่พอทำการยืม");
                $scope.cantRequest = -1;
            }
        });
        
        
        if($scope.cantRequest == 0 && $scope.cartlist.length != 0){
            if($scope.selectedProject === undefined || $scope.selectedProject === null)
                {
                    alert("กรุณาเลือกโปรเจค");      
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
                                            crd_amt: value.volumeRequest,
                                            crd_price: value.cc_price,
                                            crd_unit: value.cu_name_abb}, 
                                headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
                            }).then(function(response) {
                                console.log(response);
                            })    
                        }); 
                    })
                alert("ดำเนินการเพิ่มรายการเรียบร้อย");
            }
            
        }else{
            alert("ดำเนินการยืมไม่สำเร็จ");
        }
    }
    
});