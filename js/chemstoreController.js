//  Login   ============================================================================================================
chemstore.controller('loginCtrl', function($rootScope, $scope, $http, $timeout, $location, toastr) {
    $scope.createLogin = function() {
        $http({
            method: 'POST',
            url: '../php/createSession.php',
            data: { ca_user: $scope.login.username, ca_pass: $scope.login.password }
        }).then(function(response) {
            console.log(response.data);
            $rootScope.logIn = false;
            if (response.data == "true") {
                $rootScope.logIn = true;

                toastr.success('ยินดีต้อนรับเข้าสู่ระบบ');
                $timeout(location.reload(), 5000);

                $location.path('/news')
            } else {
                toastr.error('เข้าสู่ระบบไม่สำเร็จ', 'username หรือ password ไม่ถูกต้อง');
            }
        });
    }

    $scope.checkSession = function() {
        //-------------------------------------------------------------
        $http({
            method: 'GET',
            url: '../php/getKey.php'
        }).then(function(response) {
            $scope.key = response.data;
        });

        $http({
            method: 'GET',
            url: '../php/getType.php'
        }).then(function(response) {
            $scope.type = response.data;
        });

        $http({
            method: 'GET',
            url: '../php/getSession.php'
        }).then(function(response) {
            $scope.session = response.data;
        });

    }
    $scope.myInterval = 3000;

    $scope.slides = [{
        image: '../img/slide1.jpg'
    }, {
        image: '../img/slide2.jpg'
    }, {
        image: '../img/slide3.jpg'
    }, {
        image: '../img/slide4.jpg'
    }];

    console.log($scope.slides);

    //  Notifications
    $scope.startTimer = function() {
        $scope.noti();
        setInterval($scope.noti, 1000);
    }

    $scope.noti = function() {
        $http({
            method: 'GET',
            url: '../php/noti.php'
        }).then(function(response) {
            $scope.requestChemNoti = parseInt(response.data[0]);
            $scope.requestChemIncreaseNoti = parseInt(response.data[1]);
            $scope.requestOtherNoti = parseInt(response.data[2]);
            $scope.sumNoti = parseInt($scope.requestChemNoti) + parseInt($scope.requestChemIncreaseNoti) + parseInt($scope.requestOtherNoti);
        });
    }

    window.onload = function() {
        $scope.startTimer();
    };

})

//  Logout   ============================================================================================================
.controller('logoutCtrl', function($scope, $http, $timeout, $location, toastr) {
    alert("ออกจากระบบ")
        //toastr.success('ออกจากระบบ');
    $timeout(location.reload(), 5000);
    window.location.href = "../php/logout.php";
})

//  คลังสินค้า  ============================================================================================================
.controller('categoryCtrl', function($scope, $http) {
    $scope.begin = 0;
    $scope.test;
    $scope.showcontent = false;
    $scope.options = [{
        name: '5',
        value: 5
    }, {
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

    $scope.deleteRecord = function() {
        if (parseInt($scope.begin) - parseInt($scope.searchRange.value) < 0)
            $scope.begin = 0;
        else
            $scope.begin = parseInt($scope.begin) - parseInt($scope.searchRange.value);
    }

    $scope.addRecord = function() {
        console.log(parseInt($scope.begin) + parseInt($scope.searchRange.value) < $scope.listChem.length);
        if (parseInt($scope.begin) + parseInt($scope.searchRange.value) < $scope.listChem.length)
            $scope.begin = parseInt($scope.begin) + parseInt($scope.searchRange.value);
    }

    $scope.showdetail = function(index) {
        $scope.index = index;
        $scope.showcontent = true;
    }

    $http({
        method: 'GET',
        url: '../php/select_chemLocation.php',
    }).then(function(response) {
        $scope.listLocation = response.data;
    });
    $scope.selectData = "จุฬาภรณ์1";
    $http({
        method: 'GET',
        url: '../php/select_chemCategory.php',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function(response) {
        $scope.listChem = response.data;
    })
})

//  ยืนยันคำร้องขอ  ========================================================================================================
.controller('submitRequestChemCtrl', function($scope, $http, $timeout, toastr) {
    $scope.showcontent = false;
    //  ปุ่ม prev
    $scope.deleteRecord = function() {
        if (parseInt($scope.begin) - parseInt($scope.searchRange.value) < 0)
            $scope.begin = 0;
        else
            $scope.begin = parseInt($scope.begin) - parseInt($scope.searchRange.value);
    }

    //  ปุ่ม next
    $scope.addRecord = function() {
        if (parseInt($scope.begin) + parseInt($scope.searchRange.value) < $scope.listReciept.length)
            $scope.begin = parseInt($scope.begin) + parseInt($scope.searchRange.value);
    }

    $scope.begin = 0;
    //  จำนวนแสดง
    $scope.options = [{
        name: '5',
        value: 5
    }, {
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
        method: 'POST',
        url: '../php/select_chemReceipt.php',
        data: { findthis: 'all' }
    }).then(function(response) {
        $scope.listReciept = response.data;
        console.log($scope.listReciept);
    });
    $scope.showdetail = function(getdata, index) {
        $scope.showcontent = true;
        console.log(getdata, index);
        $scope.index = index;
        $http({
            method: 'POST',
            url: '../php/select_chemdetail.php',
            data: { crd_cr_fk: getdata }
        }).then(function(response) {

            $scope.chemdetail = response.data;
        });
    }

    $scope.cancelRequest = function() {
        $http({
            method: 'POST',
            url: '../php/update_submitChemRequest.php',
            data: {
                cr_pk: $scope.listReciept[$scope.index].cr_pk,
                cr_cp_fk: $scope.listReciept[$scope.index].cp_pk,
                cp_teach_fk: $scope.listReciept[$scope.index].ca_pk,
                totalprice: $scope.listReciept[$scope.index].cr_totalprice,
                status: 2
            }
        }).then(function(data) {
            $http({
                method: 'POST',
                url: '../php/update_receiptDetail.php',
                data: {
                    crd_cr_fk: $scope.listReciept[$scope.index].cr_pk,
                    status: 2
                }
            }).then(function(data) {
                toastr.success('ดำเนินการเรียบร้อย');
                $timeout(location.reload(), 5000);
            });
        });
    }

    $scope.submitRequest = function() {
        $http({
            method: 'POST',
            url: '../php/update_submitChemRequest.php',
            data: {
                cr_pk: $scope.listReciept[$scope.index].cr_pk,
                cr_cp_fk: $scope.listReciept[$scope.index].cp_pk,
                cp_teach_fk: $scope.listReciept[$scope.index].ca_pk,
                totalprice: $scope.listReciept[$scope.index].cr_totalprice,
                status: 3
            }
        }).then(function(data) {
            $http({
                method: 'POST',
                url: '../php/update_receiptDetail.php',
                data: {
                    crd_cr_fk: $scope.listReciept[$scope.index].cr_pk,
                    status: 0
                }
            }).then(function(data) {
                toastr.success('ดำเนินการเรียบร้อย');
                $timeout(location.reload(), 5000);
            });
        });
    }
})

//จัดการคำร้องขอย้ายคลังสารเคมี ================================================================
.controller('submitExchangeChemCtrl', function($scope, $http, $timeout, toastr) {
    $scope.showcontent = 1;
    $http({
        method: 'POST',
        url: '../php/select_exchangeChem.php',
        data: { findthis: "all" }
    }).then(function(response) {
        $scope.listExchange = response.data;
        //                console.log($scope.listExchange);
    });
    $scope.showdetail = function(getdata, index) {
        //            console.log(getdata);
        $scope.index = index;
        $http({
            method: 'POST',
            url: '../php/select_exchangeDetail.php',
            data: { findthis: getdata }
        }).then(function(response) {
            $scope.chemdetail = response.data;
            console.log($scope.listExchange[$scope.index]);
            console.log($scope.chemdetail);
            $scope.showcontent = 2;
        });
    }
    $scope.cancelRequest = function() {
        $http({
            method: 'POST',
            url: '../php/update_submitExchangeRequest.php',
            data: {
                ce_pk: $scope.listExchange[$scope.index].ce_pk,
                status: 2
            }
        }).then(function(data) {
            $http({
                method: 'POST',
                url: '../php/update_exchangeDetail.php',
                data: {
                    ced_ce_fk: $scope.listExchange[$scope.index].ce_pk,
                    status: 2
                }
            }).then(function(data) {
                toastr.success('ดำเนินการเรียบร้อย');
                $timeout(location.reload(), 5000);
            });
        });
    }
    $scope.submitRequest = function() {
        $http({
            method: 'POST',
            url: '../php/update_submitExchangeRequest.php',
            data: {
                ce_pk: $scope.listExchange[$scope.index].ce_pk,
                status: 3
            }
        }).then(function(data) {
            $http({
                method: 'POST',
                url: '../php/update_exchangeDetail.php',
                data: {
                    ced_ce_fk: $scope.listExchange[$scope.index].ce_pk,
                    status: 0
                }
            }).then(function(data) {
                toastr.success('ดำเนินการเรียบร้อย');
                $timeout(location.reload(), 5000);
            });
        });
    }
})

//  จัดการคำร้องขออื่นๆ  ============================================================================================================
.controller('submitRequestOther', function($scope, $http, $timeout, toastr) {
    $scope.deleteRecord = function() {
        if (parseInt($scope.begin) - parseInt($scope.searchRange.value) < 0)
            $scope.begin = 0;
        else
            $scope.begin = parseInt($scope.begin) - parseInt($scope.searchRange.value);
    }

    //  ปุ่ม next
    $scope.addRecord = function() {
        if (parseInt($scope.begin) + parseInt($scope.searchRange.value) < $scope.listManageRequestOther.length)
            $scope.begin = parseInt($scope.begin) + parseInt($scope.searchRange.value);
    }

    $scope.begin = 0;
    //  จำนวนแสดง
    $scope.options = [{
        name: '5',
        value: 5
    }, {
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
        method: 'POST',
        url: '../php/select_manageRequestOther.php'
    }).then(function(response) {
        $scope.listManageRequestOther = response.data;
    });
    $scope.confirmRequestOther = function(cro_pk) {
        $http.post("../php/update_submitOtherRequest.php", {
            'cro_pk': cro_pk
        }).success(function(data) {
            toastr.success('ยืนยันคำร้องเรียบร้อย');
            $timeout(location.reload(), 5000);
        });
    }
})

//  นำสารเข้า  ============================================================================================================
.controller('inboundChemCtrl', function($scope, $http, $timeout, toastr) {
    //  แสดงสถานที่
    $scope.addChem = {
        cc_state: "S",
        cl_pk: "1",
        cu_pk: "1",
        cu_nameforvolume: "kg",
        cc_expDt: new Date()
    }
    $http({
        method: 'POST',
        url: '../php/select_chemLocation.php',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function(response) {
        $scope.listLoc = response.data;
    })

    //  แสดงหน่วย
    $http({
        method: 'POST',
        url: '../php/select_chemUnit.php',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function(response) {
        $scope.listUnit = response.data;
    })

    $scope.cancleChem = function() {
        $scope.addChem = {
            cc_state: "S",
            cu_nameforvolume:"kg",
            cl_pk: "1",
            cu_pk: "1",
            cc_expDt: new Date()
        }
    }

    //  ยืนยันเพิ่มสาร
    $scope.insertChem = function() {
        $http({
            method: 'POST',
            url: '../php/insert_chemCategory.php',
            data: {
                name: $scope.addChem.cc_name,
                casNo: $scope.addChem.cc_casNo,
                state: $scope.addChem.cc_state,
                packing: $scope.addChem.cc_packing,
                volume: $scope.addChem.cc_volume+' '+$scope.addChem.cu_nameforvolume,
                unit_fk: $scope.addChem.cu_pk,
                qty: $scope.addChem.cc_quantity,
                loc_fk: $scope.addChem.cl_pk,
                room: $scope.addChem.cc_room,
                price: $scope.addChem.cc_price,
                grade: $scope.addChem.cc_grade,
                expDt: $scope.addChem.cc_expDt,
                desc: $scope.addChem.cc_desc,
                producer: $scope.addChem.cc_producer
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function(response) {
            console.log(response);
            alert("ดำเนินการเพิ่มเรียบร้อย");
            //toastr.success('ดำเนินการเพิ่มเรียบร้อย');
            $scope.addChem = {
                cc_state: "S",
                cl_pk: "1",
                cu_pk: "1",
                cu_nameforvolume: "kg",
                cc_expDt: new Date()
            }
        })
    }
})

//  แก้ไขข้อมูลสารเคมี  =======================================================================================================
.controller('editChemCtrl', function($scope, $http, $filter, $timeout, toastr) {


    //  ปุ่ม prev
    $scope.deleteRecord = function() {
        if (parseInt($scope.begin) - parseInt($scope.searchRange.value) < 0)
            $scope.begin = 0;
        else
            $scope.begin = parseInt($scope.begin) - parseInt($scope.searchRange.value);
    }

    //  ปุ่ม next
    $scope.addRecord = function() {
        if (parseInt($scope.begin) + parseInt($scope.searchRange.value) < $scope.listChem.length)
            $scope.begin = parseInt($scope.begin) + parseInt($scope.searchRange.value);
    }

    $scope.begin = 0;
    $scope.cartlist = [];
    //  จำนวนแสดง
    $scope.options = [{
        name: '5',
        value: 5
    }, {
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
        method: 'GET',
        url: '../php/select_chemCategory.php',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function(response) {
        $scope.listChem = response.data;
    })

    //  แสดงสถานที่
    $http({
        method: 'POST',
        url: '../php/select_chemLocation.php',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function(response) {
        $scope.listLoc = response.data;
    })
    $scope.selectData = "จุฬาภรณ์1";
    //  แสดงหน่วย
    $http({
        method: 'POST',
        url: '../php/select_chemUnit.php',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function(response) {
        $scope.listUnit = response.data;
    })
    //-----------------------------------------------------------------------------------
    $scope.editThisData = {}

    $scope.showeditpage = true;
    $scope.editContact = function(selectedData) {
        $scope.editThisData = selectedData;
        $scope.editThisData.cc_expDt = new Date($scope.editThisData.cc_expDt);
        $scope.showeditpage = false;
        for(var i = 0;i<$scope.editThisData.cc_volume.length;i++){
            if($scope.editThisData.cc_volume.substring(i,i+1) == ' '){
                $scope.editThisData.cu_nameforvolume = $scope.editThisData.cc_volume.substring(i+1,$scope.editThisData.cc_volume.length+2);
                $scope.editThisData.cc_volume = $scope.editThisData.cc_volume.substring(0,i); 
            }
        } 
    };

    $scope.saveContact = function() {
        $scope.showeditpage = true;
        console.log($scope.editThisData.cu_nameforvolume);
        $http.post("../php/update_chem.php", {
            'cc_pk': $scope.editThisData.cc_pk,
            'cc_name': $scope.editThisData.cc_name,
            'cc_casNo': $scope.editThisData.cc_casNo,
            'cc_state': $scope.editThisData.cc_state,
            'cc_volume': $scope.editThisData.cc_volume+' '+$scope.editThisData.cu_nameforvolume,
            'cc_unit_fk': $scope.editThisData.cu_pk,
            'cc_quantity': $scope.editThisData.cc_quantity,
            'cc_packing': $scope.editThisData.cc_packing,
            'cc_location_fk': $scope.editThisData.cl_pk,
            'cc_room': $scope.editThisData.cc_room,
            'cc_price': $scope.editThisData.cc_price,
            'cc_grade': $scope.editThisData.cc_grade,
            'cc_expDt': $scope.editThisData.cc_expDt,
            'cc_producer': $scope.editThisData.cc_producer,
            'cc_desc': $scope.editThisData.cc_desc,

        }).success(function(data, status, headers, config) {
            console.log(data);
            alert("แก้ไขข้อมูลเรียบร้อย");
            location.reload();
        });
    };

    $scope.delectContact = function(selectedData) {
        console.log("Delete contact", selectedData.cc_pk);

        if (confirm("ยืนยันการลบข้อมูล") == true) {
            $http.post("../php/delete_chem.php", {
                'cc_pk': selectedData.cc_pk

            }).success(function(data, status, headers, config) {
                console.log(data);
                alert("ลบข้อมูลเรียบร้อย");
                location.reload();
            });
        } else {

        }


    }
})

//  ประวัติการนำเข้าสาร  ============================================================================================================
.controller('importlogCtrl', function($scope, $http) {

    $scope.page = true;
    $scope.logImpt = {
        location: '',
        state: '',
        stDt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        edDt: new Date(),
        name: '',
        casNo: '',
        grade: '',
        selectAll: ''
    }

    $scope.back = function() {
        $scope.page = true;
    }

    $scope.search = function() {
        $scope.page = false;
        if ($scope.logImpt.stDt == null || $scope.logImpt.edDt == null) {
            alert("กรุณากรอกวันเริ่มต้น-สิ้นสุด");
            return;
        }

        if ($scope.logImpt.stDt > $scope.logImpt.edDt) {
            alert("ท่านระบุวันเริ่มต้นเกินวันที่สิ้นสุด");
            return;
        }

        $http({
            method: 'POST',
            url: '../php/select_logImport.php',
            data: {
                location: $scope.logImpt.location,
                state: $scope.logImpt.state,
                stDt: $scope.logImpt.stDt,
                edDt: new Date($scope.logImpt.edDt.getFullYear(), $scope.logImpt.edDt.getMonth(), $scope.logImpt.edDt.getDate() + 1),
                name: $scope.logImpt.name,
                casNo: $scope.logImpt.casNo,
                grade: $scope.logImpt.grade,
                selectAll: $scope.logImpt.selectAll


            }
        }).then(function(response) {
            $scope.listImport = response.data;
            console.log("res :", $scope.listImport);
        });

    }
    $http({
        method: 'GET',
        url: '../php/select_chemLocation.php',
    }).then(function(response) {
        $scope.listLocation = response.data;
        console.log($scope.listLocation);
    });
})

//  ประวัติการเบิกสาร  ============================================================================================================
.controller('receiptlogCtrl', function($scope, $http) {

    $scope.showcontent = 1;
    $scope.logRecpt = {
        stDt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        edDt: new Date(),
        no: '',
        project: '',
        selectAll: ''
    }

    $scope.search = function() {
        if ($scope.logRecpt.stDt == null || $scope.logRecpt.edDt == null) {
            alert("กรุณากรอกวันเริ่มต้น-สิ้นสุด");
        } else if ($scope.logRecpt.stDt > $scope.logRecpt.edDt) {
            alert("ท่านระบุวันเริ่มต้นเกินวันที่สิ้นสุด");
        } else {
            $http({
                method: 'POST',
                url: '../php/select_logReciept.php',
                data: {
                    type: 'all',
                    stDt: $scope.logRecpt.stDt,
                    edDt: new Date($scope.logRecpt.edDt.getFullYear(), $scope.logRecpt.edDt.getMonth(), $scope.logRecpt.edDt.getDate() + 1),
                    no: $scope.logRecpt.no,
                    project: $scope.logRecpt.project,
                    selectAll: $scope.logRecpt.selectAll
                }
            }).then(function(response) {
                $scope.listReciept = response.data;
                console.log($scope.listReciept);
                $scope.showcontent = 2;
            });
        }
    }

    $scope.showdetail = function(selectedData, index) {
        $scope.index = index;
        $http({
            method: 'POST',
            url: '../php/select_chemdetail.php',
            data: {
                'crd_cr_fk': selectedData
            }
        }).then(function(response) {
            $scope.listRecieptDetail = response.data;
            console.log($scope.listRecieptDetail);
            $scope.showcontent = 3;
        });
    }
})

//  ประวัติการย้ายคลัง  ============================================================================================================
.controller('ExchangeLogCtrl', function($scope, $http) {
    $scope.showcontent = 1;
    $scope.logExchg = {
        stDt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        edDt: new Date(),
        no: '',
        locationF: '1',
        locationT: '2'
    }

    $scope.search = function() {

        if ($scope.logExchg.stDt == null || $scope.logExchg.edDt == null) {
            alert("กรุณากรอกวันเริ่มต้น-สิ้นสุด");
            return;
        }

        if ($scope.logExchg.stDt > $scope.logExchg.edDt) {
            alert("ท่านระบุวันเริ่มต้นเกินวันที่สิ้นสุด");
            return;
        }

        console.log($scope.showcontent);
        $http({
            method: 'POST',
            url: '../php/select_logExchange.php',
            data: {
                type: 'all',
                locationF: $scope.logExchg.locationF,
                locationT: $scope.logExchg.locationT,
                stDt: $scope.logExchg.stDt,
                edDt: new Date($scope.logExchg.edDt.getFullYear(), $scope.logExchg.edDt.getMonth(), $scope.logExchg.edDt.getDate() + 1),
                no: $scope.logExchg.no
            }
        }).then(function(response) {
            $scope.listReciept = response.data
            $scope.showcontent = 2;
            console.log(response);
        });
    }

    $http({
        method: 'GET',
        url: '../php/select_chemLocation.php',
    }).then(function(response) {
        $scope.listLocation = response.data;
        console.log($scope.listLocation);
    });

    $scope.showdetail = function(index) {
        $scope.index = index;
        console.log($scope.listReciept[$scope.index]);
        $http({
            method: 'POST',
            url: '../php/select_exchangeDetail.php',
            data: { findthis: $scope.listReciept[$scope.index].ce_pk }
        }).then(function(response) {
            $scope.chemdetail = response.data;

            $scope.showcontent = 3;
        });
    }
})

//  ประวัติการเบิกสารอาจารย์  ============================================================================================================
.controller('teacherReceiptlogCtrl', function($scope, $http) {
    $scope.showcontent = 1;
    $scope.logRecpt = {
        stDt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        edDt: new Date(),
        no: '',
        project: '',
        selectAll: ''
    }

    $scope.search = function() {
        if ($scope.logRecpt.stDt == null || $scope.logRecpt.edDt == null) {
            alert("กรุณากรอกวันเริ่มต้น-สิ้นสุด");
        } else if ($scope.logRecpt.stDt > $scope.logRecpt.edDt) {
            alert("ท่านระบุวันเริ่มต้นเกินวันที่สิ้นสุด");
        } else {
            $http({
                method: 'POST',
                url: '../php/select_logReciept.php',
                data: {
                    type: $scope.key,
                    stDt: $scope.logRecpt.stDt,
                    edDt: new Date($scope.logRecpt.edDt.getFullYear(), $scope.logRecpt.edDt.getMonth(), $scope.logRecpt.edDt.getDate() + 1),
                    no: $scope.logRecpt.no,
                    project: $scope.logRecpt.project,
                    selectAll: $scope.logRecpt.selectAll
                }
            }).then(function(response) {
                $scope.listReciept = response.data;
                $scope.showcontent = 2;
            });
        }
    }

    $scope.showdetail = function(selectedData, index) {
        $scope.index = index;
        $http({
            method: 'POST',
            url: '../php/select_chemdetail.php',
            data: {
                'crd_cr_fk': selectedData
            }
        }).then(function(response) {
            $scope.listRecieptDetail = response.data;
            $scope.showcontent = 3;
        });
    }
})

//  ประวัติคำร้องขออื่นๆ  ============================================================================================================
.controller('otherlogCtrl', function($scope, $http) {
    $scope.showcontent = 1;
    $http({
        method: 'POST',
        url: '../php/select_logOther.php',
        data: { type: "all" }
    }).then(function(response) {
        $scope.listManageRequestOther = response.data;
    });

    $scope.showdetail = function(index) {
        console.log($scope.listManageRequestOther[index]);
        $scope.index = index;
        $scope.showcontent = 2;
    }
})

//  ประวัติคำร้องขออื่นๆของทุกสิท  ============================================================================================================
.controller('allOtherlogCtrl', function($scope, $http) {
    $scope.showcontent = 1;
    $http({
        method: 'POST',
        url: '../php/select_logOther.php',
        data: { type: $scope.key }
    }).then(function(response) {
        $scope.listManageRequestOther = response.data;
    });

    $scope.showdetail = function(index) {
        console.log($scope.listManageRequestOther[index]);
        $scope.index = index;
        $scope.showcontent = 2;
    }
})

//  member  ============================================================================================================
.controller('addMembersCtrl', function($scope, $http, $timeout, toastr) {
    //    เลือกประเภทผู้ใช้
    $http({
        method: 'GET',
        url: '../php/select_accountType.php'
    }).then(function(response) {
        $scope.listAcountType = response.data;
    });
    $http({
        method: 'GET',
        url: '../php/select_chemLocation.php'
    }).then(function(response) {
        $scope.listloc = response.data;
    });
    $scope.addMember = {
            acctyp: "4",
            responPlace : '',
            code:'',
            user:'',
            pass:'',
            tname:'',
            fname:'',
            lname:'',
            tel:'',
        }
        //     ล้างค่า
    $scope.clearMember = function() {
            $scope.addMember = { acctyp: "4" }
    }
    $scope.clearResponPlace = function() {
        if($scope.addMember.acctyp != 3 || $scope.addMember.acctyp != 4){
            $scope.addMember.responPlace = '';
        }
    }
        //      เพิ่มสมาชิก
    $scope.createMember = function() {
        if(($scope.addMember.acctyp == 4 || $scope.addMember.acctyp == 3) && $scope.addMember.responPlace == ''){
            alert("หัวหน้านักวิทหรือนักวิทย์จะต้องกรอกข้อมูลคลังที่รับผิดชอบ");
        }else{
            $http.post("../php/insert_chemAccount.php", {
                'code': $scope.addMember.code,
                'user': $scope.addMember.user,
                'pass': $scope.addMember.pass,
                'tname': $scope.addMember.tname,
                'fname': $scope.addMember.fname,
                'lname': $scope.addMember.lname,
                'tel': $scope.addMember.tel,
                'acctyp': $scope.addMember.acctyp,
                responPlace: $scope.addMember.responPlace
            }).success(function(data) {
                console.log(data);
                if (data.substring(data.length - 55, data.length - 38) == "Error : Duplicate") {
                    alert("มี username นี้อยู่ในระบบแล้ว");
                    //toastr.error('มี username นี้อยู่ในระบบแล้ว');
                } else {
                    alert("เพิ่มสมาชิกเรียบร้อย");
                    //toastr.success('เพิ่มสมาชิกเรียบร้อย');
                    $scope.addMember = { acctyp: "4" };
                }
            }); 
        }
    }
})

//  edit member  =========================================================================================================
.controller('editMembersCtrl', function($scope, $http, $timeout, toastr) {
    //  แก้ไขข้อมูลส่วนตัว
    $scope.confirmMember = function() {
        $scope.checked = true;
        $scope.dis = false;
        $scope.btng1 = false;
        $scope.btng2 = false;
    }

    //  เปลี่ยนรหัสผ่าน
    $scope.changePassMember = function() {
        $scope.checked = false;
        $scope.dis = false;
        $scope.btng1 = false;
        $scope.btng3 = false;
    }

    //  ยกเลิก
    $scope.cancleMember = function() {
            $scope.checked = true;
            $scope.dis = true;
            $scope.btng1 = true;
            $scope.btng2 = true;
            $scope.btng3 = true;
            $scope.fix = true;
        }
        //    เลือกผู้ใช้
    $http({
        method: 'POST',
        url: '../php/select_account_where.php',
        data: { ca_pk: $scope.key },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function(response) {
        $scope.listAcountData = response.data[0];
    });

    //  ยืนยันแก้ไขข้อมูลส่วนตัว
    $scope.updateMember = function() {
            $http.post("../php/update_member.php", {
                'pk': $scope.listAcountData.ca_pk,
                'code': $scope.listAcountData.ca_code,
                'tname': $scope.listAcountData.ca_tname,
                'fname': $scope.listAcountData.ca_fname,
                'lname': $scope.listAcountData.ca_lname,
                'tel': $scope.listAcountData.ca_tel,
            }).success(function(data) {
                toastr.success('แก้ไขสมาชิกเรียบร้อย');
                $timeout(location.reload(), 5000);
            });
        }
        //  ยืนยันแก้ไขรหัสผ่าน
    $scope.updatePassMember = function() {
        if ($scope.pass != $scope.listAcountData.ca_pass) {
            toastr.error('รหัสผ่านไม่ถูกต้อง / ไม่ได้กรอกรหัสผ่าน');
            $timeout(5000);
        } else {
            if ($scope.new_pass != $scope.re_new_pass) {
                toastr.error('รหัสผ่านใหม่ไม่สอดคล้องกัน');
                $timeout(5000);
            } else {
                $http.post("../php/update_passMember.php", {
                    'pk': $scope.listAcountData.ca_pk,
                    'pass': $scope.new_pass
                }).success(function(data) {
                    toastr.success('แก้ไขสมาชิกเรียบร้อย');
                    $timeout(location.reload(), 5000);
                });
            }
        }
    }
})

//  สถานะคำร้องขอของอาจารย์  ============================================================================================================
.controller('teacherRequestCtrl', function($scope, $http) {
    $scope.content = false;

    $scope.begin = 0;
    $scope.options = [{
        name: '5',
        value: 5
    }, {
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
    $scope.deleteRecord = function() {
        if (parseInt($scope.begin) - parseInt($scope.searchRange.value) < 0)
            $scope.begin = 0;
        else
            $scope.begin = parseInt($scope.begin) - parseInt($scope.searchRange.value);
    }

    $scope.addRecord = function() {
        if (parseInt($scope.begin) + parseInt($scope.searchRange.value) < $scope.listReciept.length)
            $scope.begin = parseInt($scope.begin) + parseInt($scope.searchRange.value);
    }

    $http({
        method: 'POST',
        url: '../php/select_chemReceipt.php',
        data: { findthis: $scope.key }
    }).then(function(response) {
        $scope.listReciept = response.data;
        console.log($scope.listReciept);
    });

    $scope.showdetail = function(getdata, index) {
        $scope.index = index;
        console.log($scope.listReciept[$scope.index]);
        $http({
            method: 'POST',
            url: '../php/select_chemdetail.php',
            data: { crd_cr_fk: getdata }
        }).then(function(response) {
            $scope.chemdetail = response.data;
            console.log($scope.chemdetail);
            $scope.content = true;
        });
    }
})

//  เบิกสาร  ============================================================================================================
.controller('teacherAddReciept', function($scope, $http, $timeout, toastr) {
    $scope.cartlist = [];

    $http({
        method: 'GET',
        url: '../php/select_chemLocation.php',
    }).then(function(response) {
        $scope.listLocation = response.data;
        $scope.selectData = response.data[0].cl_name;
    });
    $http({
        method: 'POST',
        url: '../php/select_chemProject.php',
        data: { teacher_pk: $scope.key },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function(response) {
        $scope.listProject = response.data;
    });

    $http({
        method: 'GET',
        url: '../php/select_chemCategory.php',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function(response) {
        $scope.listChem = response.data;
    })

    $http({
        method: 'POST',
        url: '../php/select_account_where.php',
        data: { ca_pk: $scope.key },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function(response) {
        $scope.listAcountData = response.data;
    });

    $scope.begin = 0;
    $scope.options = [{
        name: '5',
        value: 5
    }, {
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
    $scope.deleteRecord = function() {
        if (parseInt($scope.begin) - parseInt($scope.searchRange.value) < 0)
            $scope.begin = 0;
        else
            $scope.begin = parseInt($scope.begin) - parseInt($scope.searchRange.value);
    }

    $scope.addRecord = function() {
        if (parseInt($scope.begin) + parseInt($scope.searchRange.value) < $scope.listChem.length)
            $scope.begin = parseInt($scope.begin) + parseInt($scope.searchRange.value);
    }

    $scope.addtCart = function(selectedData) {
        $scope.dupp = false;
        if (selectedData.cc_quantity > 0) {
            if ($scope.cartlist.length == 0)
                $scope.dupp = false;
            else {
                angular.forEach($scope.cartlist, function(value, key) {
                    if (value == selectedData)
                        $scope.dupp = true;
                });
            }
            if (!$scope.dupp) {
                $scope.cartlist.push(selectedData);
                var len = $scope.cartlist.length
                $scope.cartlist[len - 1].unitRequest = $scope.cartlist[len - 1].cu_name_abb;
                $scope.cartlist[len - 1].exvolumeRequest = 0;
            }
        } else {
            toastr.error("ปริมาณสาร " + selectedData.cc_name + " หมด");
            $timeout(8000);
        }
    }

    $scope.deleteCart = function(deletedIndex) {
        $scope.cartlist.splice(deletedIndex, 1);
    }

    $scope.pricecal = function(index) {
        $scope.total = 0;
        //อัลกอแปลงหน่วย
        if ($scope.cartlist[index].cu_name_abb == "kg") {
            if ($scope.cartlist[index].unitRequest == "kg") {
                $scope.cartlist[index].totalprice = $scope.cartlist[index].volumeRequest * $scope.cartlist[index].cc_price;
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest;
            } else if ($scope.cartlist[index].unitRequest == "mg") {
                $scope.cartlist[index].totalprice = $scope.cartlist[index].volumeRequest / 1000 / 1000 * $scope.cartlist[index].cc_price;
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest / 1000 / 1000;
            } else if ($scope.cartlist[index].unitRequest == "g") {
                $scope.cartlist[index].totalprice = $scope.cartlist[index].volumeRequest / 1000 * $scope.cartlist[index].cc_price;
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest / 1000;
            } else
                $scope.cartlist[index].totalprice = 0;
        } else if ($scope.cartlist[index].cu_name_abb == "g") {
            if ($scope.cartlist[index].unitRequest == "kg") {
                $scope.cartlist[index].totalprice = $scope.cartlist[index].volumeRequest * 1000 * $scope.cartlist[index].cc_price;
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest * 1000;
            } else if ($scope.cartlist[index].unitRequest == "mg") {
                $scope.cartlist[index].totalprice = $scope.cartlist[index].volumeRequest / 1000 * $scope.cartlist[index].cc_price;
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest / 1000;
            } else if ($scope.cartlist[index].unitRequest == "g") {
                $scope.cartlist[index].totalprice = $scope.cartlist[index].volumeRequest * $scope.cartlist[index].cc_price;
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest;
            } else
                $scope.cartlist[index].totalprice = 0;
        } else if ($scope.cartlist[index].cu_name_abb == "mg") {
            if ($scope.cartlist[index].unitRequest == "kg") {
                $scope.cartlist[index].totalprice = $scope.cartlist[index].volumeRequest * 1000 * 1000 * $scope.cartlist[index].cc_price;
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest * 1000 * 1000;
            } else if ($scope.cartlist[index].unitRequest == "mg") {
                $scope.cartlist[index].totalprice = $scope.cartlist[index].volumeRequest * $scope.cartlist[index].cc_price;
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest;
            } else if ($scope.cartlist[index].unitRequest == "g") {
                $scope.cartlist[index].totalprice = $scope.cartlist[index].volumeRequest * 1000 * $scope.cartlist[index].cc_price;
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest * 1000;
            } else
                $scope.cartlist[index].totalprice = 0;
        } else if ($scope.cartlist[index].cu_name_abb == "l") {
            if ($scope.cartlist[index].unitRequest == "l") {
                $scope.cartlist[index].totalprice = $scope.cartlist[index].volumeRequest * $scope.cartlist[index].cc_price;
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest;
            } else if ($scope.cartlist[index].unitRequest == "ml") {
                $scope.cartlist[index].totalprice = $scope.cartlist[index].volumeRequest / 1000 * $scope.cartlist[index].cc_price;
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest / 1000;
            } else
                $scope.cartlist[index].totalprice = 0;
        } else if ($scope.cartlist[index].cu_name_abb == "ml") {
            if ($scope.cartlist[index].unitRequest == "l") {
                $scope.cartlist[index].totalprice = $scope.cartlist[index].volumeRequest * 1000 * $scope.cartlist[index].cc_price;
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest * 1000;
            } else if ($scope.cartlist[index].unitRequest == "ml") {
                $scope.cartlist[index].totalprice = $scope.cartlist[index].volumeRequest * $scope.cartlist[index].cc_price;
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest;
            } else
                $scope.cartlist[index].totalprice = 0;
        }
        angular.forEach($scope.cartlist, function(value, key) {
            $scope.total = $scope.total + value.totalprice;
        });
    }

    $scope.createRequest = function() {
        $scope.cantRequest = 0;
        //ตรวจสอบความถูกต้อง

        if ($scope.cartlist.length == 0) {
            toastr.error("ไม่มีรายการสินค้า");
            $timeout(8000);
            $scope.cantRequest = -1;
        } else {
            angular.forEach($scope.cartlist, function(value, key) {
                if (isNaN(parseInt(value.volumeRequest))) {
                    toastr.error("กรุณาระบุจำนวนสาร: " + value.cc_name + " ให้ถูกต้อง");
                    $timeout(8000);
                    $scope.cantRequest = -1;
                } else if (value.volumeRequest == 0) {
                    toastr.error("สาร " + value.cc_name + " กรุณาระบุจำนวนที่ไม่ใช่ 0");
                    $timeout(8000);
                    $scope.cantRequest = -1;
                } else if (value.cc_quantity < value.exvolumeRequest) {
                    toastr.error("สาร " + value.cc_name + " มีปริมาณไม่เพียงพอ");
                    $timeout(8000);
                    $scope.cantRequest = -1;
                } else {
                    //ตรวจสอบหน่วย
                    if (value.cu_name_abb == "kg" || value.cu_name_abb == "g" || value.cu_name_abb == "mg") {
                        if (value.unitRequest == "l" || value.unitRequest == "ml") {
                            toastr.error("หน่วยของสาร " + value.cc_name + " ที่ทำการยืมไม่ถูกต้อง");
                            $timeout(8000);
                            $scope.cantRequest = -1;
                        }
                    } else {
                        if (value.cu_name_abb == "kg" || value.cu_name_abb == "g" || value.cu_name_abb == "mg") {
                            toastr.error("หน่วยของสาร " + value.cc_name + " ที่ทำการยืมไม่ถูกต้อง");
                            $timeout(8000);
                            $scope.cantRequest = -1;
                        }
                    }
                }
            });

            if ($scope.selectedProject == undefined || $scope.selectedProject == null) {
                toastr.error("กรุณาเลือกโปรเจค");
                $timeout(5000);
                $scope.cantRequest = -1;
            } else {
                if ($scope.selectedProject.cp_budget - $scope.total < 0) {
                    toastr.error("ยอดเงินคงเหลือในโปรเจคไม่เพียงพอ");
                    $timeout(5000);
                    $scope.cantRequest = -1;
                }
            }
        }

        if ($scope.cantRequest == -1) {
            toastr.error('ดำเนินการไม่สำเร็จ');
            $timeout(5000);
        } else {
            $http({
                method: 'POST',
                url: '../php/insert_reciept.php',
                data: {
                    cr_no: $scope.key +
                        new Date().getDate() +
                        (new Date().getMonth() + 1) +
                        new Date().getFullYear(),
                    cr_cp_fk: $scope.selectedProject.cp_pk,
                    cr_cost: $scope.total,
                    cr_projectbudget: $scope.selectedProject.cp_budget,
                    cr_teacherbudget: $scope.listAcountData[0].ca_credit
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function(response) {
                angular.forEach($scope.cartlist, function(value, key) {
                    $http({
                        method: 'POST',
                        url: '../php/insert_recieptDetail.php',
                        data: {
                            crd_cr_fk: response.data.cr_pk,
                            crd_cc_fk: value.cc_pk,
                            crd_amt: value.exvolumeRequest,
                            crd_price: value.totalprice,
                            crd_unit: value.cu_name_abb,
                            crd_location: value.cl_name,
                            crd_status: '0'
                        },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).then(function(response) {

                    })
                });
                toastr.success('ดำเนินการเรียบร้อย');
                $timeout(location.reload(), 5000);
            })
        }
    }
})

//  คำร้องขออื่นๆ  ============================================================================================================
.controller('addOtherCtrl', function($scope, $http, $timeout, toastr) {
    //  สร้างคำร้องอื่นๆ
    $scope.cro_header = '';
    $scope.cro_desc = '';
    $scope.createRequestOther = function() {
        if ($scope.cro_header != "" && $scope.cro_desc != "") {
            $http({
                method: 'POST',
                url: '../php/insert_requestOther.php',
                data: {
                    cro_header: $scope.cro_header,
                    cro_desc: $scope.cro_desc,
                    cro_ca_fk: $scope.key
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function(data) {
                toastr.success('ยินดีต้อนรับเข้าสู่ระบบ');
                $timeout(location.reload(), 5000);
                $scope.cro_desc = "";
            });
        } else {
            toastr.error('กรุณากรอกหัวข้อและรายละเอียด');
            $timeout(5000);
        }
    }

    //  ยกเลิก
    $scope.cancleRequestOther = function() {
        $scope.cro_desc = "";
    }
})

// ดูรายการโปรเจคproject  ============================================================================================================
.controller('viewProjectCtrl', function($scope, $http, $timeout, toastr) {

    $scope.stu_tb = false;

    $scope.listStudent = {};

    $scope.cp_pk = '';
    $scope.cs_no = '';
    $scope.cs_name = '';
    $scope.cs_tel = '';
    
    $scope.yearrange = [];
    for(var i = new Date().getFullYear()-10+543;i<new Date().getFullYear()+543;i++){
        $scope.yearrange.push({name:i,value:i});
    }
    for(var i = new Date().getFullYear()+543;i<=new Date().getFullYear()+543+10;i++){
        $scope.yearrange.push({name:i,value:i});
    }

    //  ปุ่ม prev
    $scope.deleteRecord = function() {
        if (parseInt($scope.begin) - parseInt($scope.searchRange.value) < 0)
            $scope.begin = 0;
        else
            $scope.begin = parseInt($scope.begin) - parseInt($scope.searchRange.value);
    }

    //  ปุ่ม next
    $scope.addRecord = function() {
        if (parseInt($scope.begin) + parseInt($scope.searchRange.value) < $scope.listProject.length)
            $scope.begin = parseInt($scope.begin) + parseInt($scope.searchRange.value);
    }

    $scope.begin = 0;
    $scope.cartlist = [];
    //  จำนวนแสดง
    $scope.options = [{
        name: '5',
        value: 5
    }, {
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

    $scope.editThisData = {}
    $scope.projectcout = {master : 0,bachelor: 0}
    $http({
        method: 'POST',
        url: '../php/select_chemProject.php',
        data: {
            teacher_pk: $scope.key
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function(response) {
        $scope.listProject = response.data;
        $scope.totalProjectBudget = 0;
        angular.forEach($scope.listProject, function(value, key) {
            $scope.totalProjectBudget = parseInt($scope.totalProjectBudget) + parseInt(value.cp_budget);
            if(value.cp_eduLvl == "ปริญญาตรี"){
                $scope.projectcout.bachelor +=1;
            }else{
                $scope.projectcout.master +=1;
            }
        })
    })
    $http({
        method: 'POST',
        url: '../php/select_account_where.php',
        data: { ca_pk: $scope.key },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function(response) {
        $scope.listAcountData = response.data;
        console.log($scope.listAcountData);
    });

    $scope.getTemplate = function(contact) {
        if (contact.cp_pk === $scope.editThisData.cp_pk) return 'edit';
        else return 'display';
    };

    $scope.editContact = function(selectedData) {
        console.log(selectedData);
        $scope.stu_tb = true;
        $scope.editThisData = selectedData;
        if(selectedData.cp_eduLvl == 'ปริญญาตรี'){
            $scope.editThisData.maxBudget = 7000;
        }else{
            $scope.editThisData.maxBudget = 15000;
        }
        $scope.editThisData.cp_budget = parseInt(selectedData.cp_budget);

        $http({
            method: 'POST',
            url: '../php/select_student.php',
            data: {
                cp_pk: selectedData.cp_pk
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function(response) {
            $scope.listStudent = response.data;
            console.log($scope.listStudent);
        })

    };

    $scope.checkBudget = function() {
        if ($scope.editThisData.cp_eduLvl == "ปริญญาตรี")
            $scope.editThisData.maxBudget = 7000;
        else if ($scope.editThisData.cp_eduLvl == "ปริญญาโท" || $scope.editThisData.cp_eduLvl == "ปริญญาเอก")
            $scope.editThisData.maxBudget = 15000;
        else
            $scope.editThisData.maxBudget = 0;
    }
    $scope.saveContact = function() {

        if ($scope.editThisData.cp_eduLvl == '') {
            toastr.error('กรุณาระบุระดับการศึกษา');
            $timeout(5000);
            return;
        }
        if ($scope.editThisData.cp_budget < 0) {
            toastr.error('ท่านไม่สามารถระบุยอดเงินติดลบได้');
            $timeout(5000);
            return;
        }
        if ($scope.editThisData.cp_budget > $scope.editThisData.maxBudget || $scope.editThisData.cp_current_budget > $scope.editThisData.maxBudget) {
            toastr.error("ยอดเงินเกินโควต้าระดับ : " + $scope.editThisData.cp_eduLvl + " สามาถระบุได้สูงสุด " + $scope.editThisData.maxBudget);
            $timeout(5000);
        } else {
            console.log("Saving contact");
            $http.post("../php/update_project.php", {
                'cp_pk': $scope.editThisData.cp_pk,
                'cp_name': $scope.editThisData.cp_name,
                'cp_eduLvl': $scope.editThisData.cp_eduLvl,
                'cp_reasonyear': $scope.editThisData.cp_reasonyear,
                'cp_budget': $scope.editThisData.cp_budget,
                'cp_current_budget' : $scope.editThisData.cp_current_budget,
                'cp_desc': $scope.editThisData.cp_desc

            }).success(function(data, status, headers, config) {

                console.log(data);
                toastr.success('ดำเนินการเรียบร้อย');
                $timeout(location.reload(),5000);
            });

            angular.forEach($scope.listStudent, function(value, key) {
                $http.post("../php/update_student.php", {
                    'cp_pk': $scope.editThisData.cp_pk,
                    'cs_no': value.cs_no,
                    'cs_name': value.cs_name,
                    'cs_tel': value.cs_tel

                }).success(function(data, status, headers, config) {
                    console.log(data);
                });
            })

            $scope.reset();
        }
    };

    $scope.delectContact = function(selectedData) {
        console.log("Delete contact", selectedData.cp_pk);

        if (confirm("ยืนยันการลบข้อมูล") == true) {
            $http.post("../php/delete_project.php", {
                'cp_pk': selectedData.cp_pk

            }).success(function(data, status, headers, config) {
                toastr.succes('ดำเนินการเรียบร้อย');
                $timeout(location.reload(), 5000);
            });
        } else {

        }
    }

    $scope.reset = function() {

        $scope.editThisData = {};
        $scope.stu_tb = false;
    };
})

// add project  ============================================================================================================
.controller('addProjectCtrl', function($scope, $http, $timeout, toastr) {
    //    เลือกประเภทผู้ใช้ที่เป็น teacher
    $scope.cs_code = '';
    $scope.cs_name = '';
    $scope.addProject = {
        teacher: $scope.session,
        cp_name: '',
        teacher_pk: $scope.key,
        cp_eduLvl: "ปริญญาตรี",
        maxBudget: 7000,
        cp_reasonyear : new Date().getFullYear()+543+''
    }        
    $scope.yearrange = [];
    for(var i = new Date().getFullYear()-10+543;i<new Date().getFullYear()+543;i++){
        $scope.yearrange.push({name:i,value:i});
    }
    for(var i = new Date().getFullYear()+543;i<=new Date().getFullYear()+543+10;i++){
        $scope.yearrange.push({name:i,value:i});
    }
    
    $scope.checkBudget = function() {
        if ($scope.addProject.cp_eduLvl == "ปริญญาตรี")
            $scope.addProject.maxBudget = 7000;
        else if ($scope.addProject.cp_eduLvl == "ปริญญาโท" || $scope.addProject.cp_eduLvl == "ปริญญาเอก")
            $scope.addProject.maxBudget = 15000;
        else
            $scope.addProject.maxBudget = 0;
    }
    $scope.students = [];
    $scope.addRow = function() {
        if ($scope.cs_code == '' || $scope.cs_name == '') {
            toastr.error('กรุณากรอกชื่อและรหัสนักศึกษา');
            $timeout(5000);
        } else {
            $scope.students.push({ 'cs_code': $scope.cs_code, 'cs_name': $scope.cs_name, 'cs_tel' : $scope.cs_tel });
            $scope.cs_code = '';
            $scope.cs_name = '';
            $scope.cs_tel = '';
            toastr.success('เพิ่มนักศึกษาเรียบร้อย');
            $timeout(5000);
        }
    };
    $scope.removeRow = function(cs_code) {
        var index = -1;
        var comArr = eval($scope.students);
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].cs_code === cs_code) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            toastr.error('การทำงานไม่ปกติ');
            $timeout(5000);
        }
        $scope.students.splice(index, 1);
    };
    
    $http({
        method: 'POST',
        url: '../php/select_countProject.php',
        data: {findthis : new Date().getFullYear()+543},
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function(response) {
        $scope.countProject = response.data;
    });

    $scope.checkyear = function() {
        $http({
            method: 'POST',
            url: '../php/select_countProject.php',
            data: {findthis : $scope.addProject.cp_reasonyear},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function(data) {
            $scope.countProject = data.data;
        });
    }

    $http({
        method: 'POST',
        url: '../php/select_account_where.php',
        data: { ca_pk: $scope.key },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function(response) {
        $scope.listAcountData = response.data;
        console.log($scope.listAcountData);
    });

    $scope.createProject = function() {
            //////set up โควตร้าประจำโปรเจคได้ตรงนี้
            if($scope.countProject[0].edu_count >= 4){
                toastr.error("โปรเจคปริญาตรีเกินโควต้า สามารถสร้างได้แค่ 4 โปรเจคต่อปีการศึกษา");
                $timeout(5000);
            }else{
                if($scope.countProject[0].edu_count >= 10){
                    toastr.error("โปรเจคปริญาโทและเอกเกินโควต้า สามารถสร้างได้แค่ 10 โปรเจคต่อปีการศึกษา");
                    $timeout(5000);
                }else{
                    if ($scope.students.length == 0) {
                        toastr.error('โปรเจคต้องมีนักศึกษาที่รับผิดชอบอย่างน้อย 1 คน');
                        $timeout(5000);
                    } else {
                        if ($scope.addProject.cp_name == '') {
                            toastr.error('กรุณากรอกหัวข้อปรเจค');
                            $timeout(5000);
                        } else {
                            if ($scope.addProject.cp_budget < 0) {
                                toastr.error('ไม่สามารถกรอกงบประมานติดลบได้');
                                $timeout(5000);
                            } else {
                                if ($scope.addProject.cp_budget > $scope.addProject.maxBudget) {
                                    toastr.error('ท่านกรอกข้อมูลเงินเกินงบประมานสูงสุด');
                                    $timeout(5000);
                                } else {
                                    $http({
                                        method: 'POST',
                                        url: '../php/insert_project.php',
                                        data: {
                                            teacher_pk: $scope.addProject.teacher_pk,
                                            name: $scope.addProject.cp_name,
                                            budget: $scope.addProject.cp_budget,
                                            desc: $scope.addProject.cp_desc,
                                            cp_eduLvl: $scope.addProject.cp_eduLvl,
                                            cp_current_budget : $scope.addProject.cp_budget,
                                            cp_reasonyear : $scope.addProject.cp_reasonyear
                                        },
                                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                                    }).then(function(data) {

                                        console.log(data.data.cp_pk);

                                        angular.forEach($scope.students, function(value, key) {
                                            $http({
                                                method: 'POST',
                                                url: '../php/insert_student.php',
                                                data: {
                                                    cs_cp_fk: data.data.cp_pk,
                                                    cs_no: value.cs_code,
                                                    cs_name: value.cs_name,
                                                    cs_tel: value.cs_tel,
                                                    cs_eduLv : $scope.addProject.cp_eduLvl
                                                },
                                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                                            }).then(function(response) {

                                            })
                                        });
                                        toastr.success('ดำเนินการเรียบร้อย');
                                        $timeout(location.reload(), 5000);
                                    });
                                }
                            }
                        }

                    }
                }
            }            
        }
        //  ยกเลิก
    $scope.cancleProject = function() {
        $scope.addProject = {
            teacher: $scope.session,
            teacher_pk: $scope.key,
            cp_name: '',
            cp_eduLvl: "ปริญญาตรี",
            maxBudget: 7000
        }
        $scope.students = [];
    }
})

// สร้างข่าว ===============================================================================================
.controller('addNewsCtrl', function($scope, $http, $timeout, toastr) {

    $scope.createNews = function() {

        var addNewsForm = document.getElementById("addNewsForm");

        var fd = new FormData(addNewsForm);

        var xhr = new XMLHttpRequest();

        xhr.open("POST", '../php/insert_news.php');
        /*xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                alert('success');
            } else if (uploadResult == 'success')
                alert('error');
        };*/
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                toastr.success('ดำเนินการเรียบร้อย');
                $timeout(location.reload(), 5000);
            }
        };
        xhr.send(fd);
    }

    $scope.clearNews = function() {
        $scope.addNews = {
            title: '',
            desc: '',
            link: ''
        }
    }

    $scope.deleteNews = function(cpr_pk) {
        $http({
            method: 'POST',
            url: '../php/delete_news.php',
            data: { cpr_pk: cpr_pk }
        }).then(function(response) {
            console.log(response);
            toastr.success('ดำเนินการเรียบร้อย');
            $timeout(location.reload(), 5000);//
        });
    }

})

// แสดงข่าว ===============================================================================================
.controller('showNewsCtrl', function($scope, $http) {
    $scope.showNews = function() {
        // body...
        $http({
            method: 'GET',
            url: '../php/select_news.php',
        }).then(function(response) {

            $scope.news = response.data;
        });


    }
})

//ย้ายสารเคมี ======================================================================================
.controller('seniorExchangeCtrl', function($scope, $http, $timeout, toastr) {
    $scope.cartlist = [];
    $scope.begin = 0;
    $scope.options = [{
        name: '5',
        value: 5
    }, {
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
    //        $scope.fromstore = "จุฬาภรณ์1";
    $http({
        method: 'GET',
        url: '../php/select_chemLocation.php',
    }).then(function(response) {
        $scope.listLocation = response.data;
    });

    $http({
        method: 'GET',
        url: '../php/select_chemCategory.php',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function(response) {
        $scope.listChem = response.data;
    })

    $http({
        method: 'POST',
        url: '../php/select_account_where.php',
        data: { ca_pk: $scope.key },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function(response) {
        $scope.listAcountData = response.data;
        $scope.tostore = $scope.listAcountData.ca_responplace;
    });

    $scope.deleteRecord = function() {
        if (parseInt($scope.begin) - parseInt($scope.searchRange.value) < 0)
            $scope.begin = 0;
        else
            $scope.begin = parseInt($scope.begin) - parseInt($scope.searchRange.value);
    }

    $scope.addRecord = function() {
        if (parseInt($scope.begin) + parseInt($scope.searchRange.value) < $scope.listChem.length)
            $scope.begin = parseInt($scope.begin) + parseInt($scope.searchRange.value);
    }

    $scope.addtCart = function(selectedData) {
        $scope.dupp = false;
        if (selectedData.cc_quantity > 0) {
            if ($scope.cartlist.length == 0)
                $scope.dupp = false;
            else {
                angular.forEach($scope.cartlist, function(value, key) {
                    if (value == selectedData)
                        $scope.dupp = true;
                });
            }
            if (!$scope.dupp) {
                $scope.cartlist.push(selectedData);
                var len = $scope.cartlist.length
                $scope.cartlist[len - 1].unitRequest = $scope.cartlist[len - 1].cu_name_abb;
                $scope.cartlist[len - 1].exvolumeRequest = 0;
            }
        } else {
            toastr.error("ปริมาณสาร " + selectedData.cc_name + " หมด");
            $timeout(5000);
        }
    }

    $scope.deleteCart = function(deletedIndex) {
        $scope.cartlist.splice(deletedIndex, 1);
    }

    $scope.volumecal = function(index) {
        //อัลกอแปลงหน่วย
        if ($scope.cartlist[index].cu_name_abb == "kg") {
            if ($scope.cartlist[index].unitRequest == "kg") {
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest;
            } else if ($scope.cartlist[index].unitRequest == "mg") {
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest / 1000 / 1000;
            } else if ($scope.cartlist[index].unitRequest == "g") {
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest / 1000;
            }
        } else if ($scope.cartlist[index].cu_name_abb == "g") {
            if ($scope.cartlist[index].unitRequest == "kg") {
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest * 1000;
            } else if ($scope.cartlist[index].unitRequest == "mg") {
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest / 1000;
            } else if ($scope.cartlist[index].unitRequest == "g") {
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest;
            }
        } else if ($scope.cartlist[index].cu_name_abb == "mg") {
            if ($scope.cartlist[index].unitRequest == "kg") {
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest * 1000 * 1000;
            } else if ($scope.cartlist[index].unitRequest == "mg") {
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest;
            } else if ($scope.cartlist[index].unitRequest == "g") {
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest * 1000;
            }
        } else if ($scope.cartlist[index].cu_name_abb == "l") {
            if ($scope.cartlist[index].unitRequest == "l") {
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest;
            } else if ($scope.cartlist[index].unitRequest == "ml") {
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest / 1000;
            }
        } else if ($scope.cartlist[index].cu_name_abb == "ml") {
            if ($scope.cartlist[index].unitRequest == "l") {
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest * 1000;
            } else if ($scope.cartlist[index].unitRequest == "ml") {
                $scope.cartlist[index].exvolumeRequest = $scope.cartlist[index].volumeRequest;
            }
        }
    }

    $scope.createRequest = function() {
        $scope.cantRequest = 0;
        //ตรวจสอบความถูกต้อง

        if ($scope.cartlist.length == 0) {
            toastr.error("ไม่มีรายการสินค้า");
            $timeout(5000);
            $scope.cantRequest = -1;
        } else {
            angular.forEach($scope.cartlist, function(value, key) {
                if (isNaN(parseInt(value.volumeRequest))) {
                    toastr.error("กรุณาระบุจำนวนสาร: " + value.cc_name + " ให้ถูกต้อง");
                    $timeout(5000);
                    $scope.cantRequest = -1;
                } else if (value.volumeRequest == 0) {
                    toastr.error("สาร " + value.cc_name + " กรุณาระบุจำนวนที่ไม่ใช่ 0");
                    $timeout(5000);
                    $scope.cantRequest = -1;
                } else if (value.cc_quantity < value.exvolumeRequest) {
                    toastr.error("สาร " + value.cc_name + " มีปริมาณไม่เพียงพอ");
                    $timeout(5000);
                    $scope.cantRequest = -1;
                } else {
                    //ตรวจสอบหน่วย
                    if (value.cu_name_abb == "kg" || value.cu_name_abb == "g" || value.cu_name_abb == "mg") {
                        if (value.unitRequest == "l" || value.unitRequest == "ml") {
                            toastr.error("หน่วยของสาร " + value.cc_name + " ที่ทำการยืมไม่ถูกต้อง");
                            $timeout(5000);
                            $scope.cantRequest = -1;
                        }
                    } else {
                        if (value.cu_name_abb == "kg" || value.cu_name_abb == "g" || value.cu_name_abb == "mg") {
                            toastr.error("หน่วยของสาร " + value.cc_name + " ที่ทำการยืมไม่ถูกต้อง");
                            $timeout(5000);
                            $scope.cantRequest = -1;
                        }
                    }
                }
            });
        }

        if ($scope.cantRequest == -1) {
            toastr.error("ดำเนินการยืมไม่สำเร็จ");
            $timeout(5000);
        } else {
            $http({
                method: 'POST',
                url: '../php/insert_exchange.php',
                data: {
                    ce_no: $scope.key +
                        new Date().getDate() +
                        (new Date().getMonth() + 1) +
                        new Date().getFullYear(),
                    ce_desc: $scope.cartlist.cr_desc,
                    ce_tostore: $scope.listAcountData[0].ca_responplace,
                    ce_ca_fk: $scope.key
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function(response) {
                angular.forEach($scope.cartlist, function(value, key) {
                    $http({
                        method: 'POST',
                        url: '../php/insert_exchangeDetail.php',
                        data: {
                            ced_ce_fk: response.data.ce_pk,
                            ced_cc_fk: value.cc_pk,
                            ced_amt: value.exvolumeRequest,
                            ced_unit: value.cu_name_abb,
                            ced_location_chem: value.cl_name,
                            ced_status: '0'
                        },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).then(function(response) {
                        console.log(response)
                    })
                });
                toastr.success("ดำเนินการสำเร็จ");
                $timeout(location.reload(), 5000);
            })
        }
    }
})

// user ซีเนียรดูสถานะคำร้องย้ายคลัง ==============================================================================
.controller('seniorExchangeStatusCtrl', function($scope, $http) {

    $scope.showcontent = 1;
    $http({
        method: 'POST',
        url: '../php/select_exchangeChem.php',
        data: { findthis: $scope.key }
    }).then(function(response) {
        $scope.listReciept = response.data;
    });

    $scope.showdetail = function(getdata, index) {
        $scope.index = index;
        console.log(getdata);
        console.log($scope.listReciept[$scope.index]);
        $http({
            method: 'POST',
            url: '../php/select_exchangeDetail.php',
            data: { findthis: getdata }
        }).then(function(response) {
            $scope.chemdetail = response.data;
            $scope.showcontent = 2;
        });
    }
})

// reportรายงานสถานะสารล่าสุด ========================================================================================================
.controller('viewRemainChemCtrl', function($scope, $http) {


    $scope.page = true;
    $scope.remain = {
        location: '',
        state: '',
        stDt: '',
        edDt: '',
        name: '',
        casNo: '',
        grade: '',
        selectAll: ''
    }

    $scope.back = function() {
        $scope.page = true;
    }

    $scope.search = function(select) {

        $scope.page = false;
        console.log(select.location);
        console.log(select.state);
        console.log(select.stDt);
        console.log(select.edDt);
        console.log(select.name);
        console.log(select.casNo);
        console.log(select.grade);
        console.log(select.selectAll);

        $http({
            method: 'POST',
            url: '../php/select_remainChem.php',
            data: {
                location: select.location,
                state: select.state,
                stDt: select.stDt,
                edDt: select.edDt,
                name: select.name,
                casNo: select.casNo,
                grade: select.grade,
                selectAll: select.selectAll
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function(response) {
            console.log("res :", response.data);
            $scope.listChem = response.data;
        })
    }
})

// ประวัติการย้ายคลัง ========================================================================================================
.controller('seniorExchangeLogCtrl', function($scope, $http) {
    $scope.showcontent = 1;
    $scope.logExchg = {
        stDt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        edDt: new Date(),
        no: '',
        locationF: '1',
        locationT: '2',
        selectAll: false
    }

    $scope.search = function() {
        console.log($scope.showcontent);
        $http({
            method: 'POST',
            url: '../php/select_logExchange.php',
            data: {
                type: $scope.key,
                locationF: $scope.logExchg.locationF,
                locationT: $scope.logExchg.locationT,
                stDt: $scope.logExchg.stDt,
                edDt: new Date($scope.logExchg.edDt.getFullYear(), $scope.logExchg.edDt.getMonth(), $scope.logExchg.edDt.getDate() + 1),
                no: $scope.logExchg.no,
                selectAll: $scope.logExchg.selectAll
            }
        }).then(function(response) {
            $scope.listReciept = response.data
            $scope.showcontent = 2;
            console.log(response);
        });
    }

    $http({
        method: 'GET',
        url: '../php/select_chemLocation.php',
    }).then(function(response) {
        $scope.listLocation = response.data;
        console.log($scope.listLocation);
    });

    $scope.showdetail = function(index) {
        $scope.index = index;
        console.log($scope.listReciept[$scope.index]);
        $http({
            method: 'POST',
            url: '../php/select_exchangeDetail.php',
            data: { findthis: $scope.listReciept[$scope.index].ce_pk }
        }).then(function(response) {
            $scope.chemdetail = response.data;

            $scope.showcontent = 3;
        });
    }
})

// รายงานงบประมาณ ========================================================================================================
.controller('viewBudgetCtrl', function($scope, $http, $filter) {

    $scope.reptBudgt = {
        stDt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        edDt: new Date(),
        cp_name: ''
    }

    $scope.datalist = [];

    $scope.search = function() {
        $scope.datalist = [];

        if ($scope.reptBudgt.stDt == null || $scope.reptBudgt.edDt == null) {
            alert("กรุณากรอกวันเริ่มต้น-สิ้นสุด");
            return;
        }

        if ($scope.reptBudgt.stDt > $scope.reptBudgt.edDt) {
            alert("ท่านระบุวันเริ่มต้นเกินวันที่สิ้นสุด");
            return;
        }

        $http({
            method: 'POST',
            url: '../php/select_reportBudget.php',
            data: {
                stDt: $scope.reptBudgt.stDt,
                edDt: new Date($scope.reptBudgt.edDt.getFullYear(), $scope.reptBudgt.edDt.getMonth(), $scope.reptBudgt.edDt.getDate() + 1),
                cp_name: $scope.reptBudgt.cp_name
            }
        }).then(function(response) {
            console.log('response', response);

            angular.forEach(response.data, function(value, key) {
                $scope.datalist.push([value.cp_name, parseInt(value.sum)]);
            });

            console.log('datalist', $scope.datalist)

            jQuery('#container').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'ช่วงวันที่ ' + $filter('date')($scope.reptBudgt.stDt, "dd-MM-yy") + ' ถึง ' + $filter('date')($scope.reptBudgt.edDt, "dd-MM-yy")
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'งบประมาณที่เบิก (บาท)'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: 'งบประมาณที่เบิก: <b>{point.y:.1f} บาท</b>'
                },
                series: [{
                    name: 'Population',
                    data: $scope.datalist,
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.1f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]
            });
        });
    }



})

// รายงานอันดับสารเคมีที่เบิก ========================================================================================================
.controller('viewChemRankingCtrl', function($scope, $http, $filter) {

    $scope.reptChemRank = {
        stDt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        edDt: new Date(),
        cp_name: ''
    }


    //        // Radialize the colors
    //        Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
    //            return {
    //                radialGradient: {
    //                    cx: 0.5,
    //                    cy: 0.3,
    //                    r: 0.7
    //                },
    //                stops: [
    //                    [0, color],
    //                    [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
    //                ]
    //            };
    //        });
    //
    //        $scope.init = false;


    $scope.datalist = [
        { name: '4-Acetamidophenol ', y: 56.33 }, {
            name: 'Benzoic Acid',
            y: 24.03,
            sliced: true,
            selected: true
        },
        { name: 'Calcium nitrare', y: 10.38 },
        { name: 'Ethyl Alcohol absolute', y: 4.77 }, { name: 'Opera', y: 0.91 },
        { name: 'Proprietary or Undetectable', y: 0.2 }
    ];

    $scope.search = function() {

        // Build the chart
        jQuery('#container').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'อันดับสารเคมีที่เบิกในช่วง ' + $filter('date')($scope.reptChemRank.stDt, "dd-MM-yy") + ' ถึง ' + $filter('date')($scope.reptChemRank.edDt, "dd-MM-yy")
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        },
                        connectorColor: 'silver'
                    }
                }
            },
            series: [{
                name: 'ประมาณ',
                data: $scope.datalist

            }]
        });

    }


})

// แก้ไขข้อมูลบัญชีผู้ใช้ ================F========================================================================================
.controller('manageEditAcoountCtrl', function($scope, $http) {

    //  ปุ่ม prev
    $scope.deleteRecord = function() {
        if (parseInt($scope.begin) - parseInt($scope.searchRange.value) < 0)
            $scope.begin = 0;
        else
            $scope.begin = parseInt($scope.begin) - parseInt($scope.searchRange.value);
    }

    //  ปุ่ม next
    $scope.addRecord = function() {
        if (parseInt($scope.begin) + parseInt($scope.searchRange.value) < $scope.listChem.length)
            $scope.begin = parseInt($scope.begin) + parseInt($scope.searchRange.value);
    }

    $scope.begin = 0;
    $scope.cartlist = [];
    //  จำนวนแสดง
    $scope.options = [{
        name: '5',
        value: 5
    }, {
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

    $scope.editThisData = {

    }

    //  แสดงข้อมูลสมาชิก
    $http({
        method: 'GET',
        url: '../php/select_allAccount.php',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function(response) {
        $scope.listAcc = response.data;
    })

    $scope.getTemplate = function(contact) {
        if (contact.ca_pk === $scope.editThisData.ca_pk) return 'edit';
        else return 'display';
    };

    $scope.editContact = function(selectedData) {
        $scope.editThisData = selectedData;
    };

    $scope.saveContact = function() {
        console.log("Saving contact");
        $http.post("../php/update_account.php", {
            'ca_pk': $scope.editThisData.ca_pk,
            'ca_code': $scope.editThisData.ca_code,
            'ca_user': $scope.editThisData.ca_user,
            'ca_pass': $scope.editThisData.ca_pass,
            'ca_tname': $scope.editThisData.ca_tname,
            'ca_fname': $scope.editThisData.ca_fname,
            'ca_lname': $scope.editThisData.ca_lname,
            'ca_tel': $scope.editThisData.ca_tel

        }).success(function(data, status, headers, config) {
            console.log(data);
            alert("แก้ไขข้อมูลเรียบร้อย");
            location.reload();
        });

        $scope.reset();
    };

    $scope.delectContact = function(selectedData) {
        console.log("Delete contact", selectedData.ca_pk);

        if (confirm("ยืนยันการลบข้อมูล") == true) {
            $http.post("../php/delete_account.php", {
                'ca_pk': selectedData.ca_pk

            }).success(function(data, status, headers, config) {
                console.log(data);
                alert("ลบข้อมูลเรียบร้อย");
                location.reload();
            });
        } else {

        }


    }

    $scope.reset = function() {
        $scope.editThisData = {};
    };
    // วิวอนุมัติสารแต่ละตัว =================================
})

// ซีเนียรอนุมัติการให้สารแต่ละอย่าง ==============================================================================================
.controller('seniorSubmitRequestCtrl', function($scope, $http, $timeout, toastr) {
    $http({
        method: 'POST',
        url: '../php/select_account_where.php',
        data: { ca_pk: $scope.key },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function(response) {
        $scope.listAcountData = response.data[0];
        console.log($scope.listAcountData);
        $http({
            method: 'POST',
            url: '../php/select_recieptForsenior.php',
            data: { findthis: $scope.listAcountData.ca_responplace },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function(response) {
            $scope.listReciept = response.data;
        });
    });
    $scope.showdetail = function(getdata, index) {
        $scope.showcontent = true;
        console.log(getdata, index);
        $scope.index = index;
        $http({
            method: 'POST',
            url: '../php/select_chemdetail.php',
            data: { crd_cr_fk: getdata }
        }).then(function(response) {

            $scope.chemdetail = response.data;
            console.log($scope.chemdetail);
        });
    }
    $scope.cancelrequest = function() {
        angular.forEach($scope.chemdetail, function(value, key) {
            if (value.checkthis) {
                if (value.crd_status == 4) {
                    $scope.errortype = "1";
                } else if (value.crd_status == 0) {
                    $http({
                        method: 'POST',
                        url: '../php/update_onereceiptDetail.php',
                        data: {
                            crd_pk: value.crd_pk,
                            status: 2
                        }
                    }).then(function(data) {
                        console.log(data);
                    });
                    $scope.errortype = "0";
                }
            }
        });
        if ($scope.errortype == "1") {
            toastr.error('ท่านไม่สามารถเปลี่ยนคำร้อง อนุมัติ เป็น ไม่อนุมัติ ได้');
            $timeout(5000);
        } else if ($scope.errortype == "0") {
            toastr.success('ดำเนินการเรียบร้อย');
            $timeout(location.reload(), 5000);
        }
    }
    $scope.receivedrequest = function() {
        angular.forEach($scope.chemdetail, function(value, key) {
            if (value.checkthis) {
                if (value.crd_status == 0) {
                    $scope.errortype = "1";
                } else if (value.crd_status == 4) {
                    $http({
                        method: 'POST',
                        url: '../php/update_onereceiptDetail.php',
                        data: {
                            crd_pk: value.crd_pk,
                            status: 5
                        }
                    }).then(function(data) {
                        console.log(data);
                    });
                    $scope.errortype = "0";
                }
            }
        });
        if ($scope.errortype == "1") {
            toastr.error('ท่านต้องดำเนินการอนุมัติสารเคมีก่อน');
            $timeout(5000);
        } else if ($scope.errortype == "0") {
            toastr.success('ดำเนินการเรียบร้อย');
            $timeout(location.reload(), 5000);
        }
    }
    $scope.submitrequest = function() {
        angular.forEach($scope.chemdetail, function(value, key) {
            if (value.checkthis) {
                if (value.crd_status == 4) {
                    $scope.errortype = "1";
                } else if (value.crd_status == 0) {
                    $http({
                        method: 'POST',
                        url: '../php/update_onereceiptDetail.php',
                        data: {
                            crd_pk: value.crd_pk,
                            status: 4
                        }
                    }).then(function(data) {
                        console.log(data);
                    });
                    $scope.errortype = "0";
                }
            }
        });
        if ($scope.errortype == "1") {
            toastr.error('ท่านไม่สามารถอนุมัติคำร้องที่อนุมัติไปแล้วได้');
            $timeout(5000);
        } else if ($scope.errortype == "0") {
            toastr.success('ดำเนินการเรียบร้อย');
            $timeout(location.reload(), 5000);
        }
    }
    $scope.statuslist = [];
    $scope.sameAlldata = true;
    $scope.checkselect = function(index) {
        $scope.sameAlldata = true;
        if ($scope.chemdetail[index].checkthis) {
            $scope.statuslist.splice(index, 0, $scope.chemdetail[index].crd_status);
        } else {
            $scope.statuslist.splice(index, 1);
        }
        for (var i = 0; i < $scope.statuslist.length - 1; i++) {
            if ($scope.statuslist[i] != $scope.statuslist[i + 1]) {
                $scope.sameAlldata = false;
            }
        }
    }
});

// ซีเนียรอนุมัติการย้ายสารของแต่ละคลัง
