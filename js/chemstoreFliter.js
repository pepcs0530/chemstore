//  เซ็ต FORMAT Date & Datetime ============================================================================================================
chemstore.filter('Date', function($filter){
    return function(input){
        
        if(input == null || input == "0000-00-00 00:00:00"){ return ""; } 

        var _date = $filter('date')(new Date(input),'dd/MM/yyyy');

        return _date.toUpperCase();

    };
})
    .filter('Datetime', function($filter){
    return function(input){
        if(input == null || input == "0000-00-00 00:00:00"){ return ""; } 

        var _date = $filter('date')(new Date(input),'dd/MM/yyyy - HH:mm:ss');

        return _date.toUpperCase();
    };
})

    .filter('confirmFilter', function($sce) {
   return function(input) {
       if(input == '0')
            return $sce.trustAsHtml("<FONT COLOR=red><b>รอการยืนยัน</b></FONT>");
       else if(input == '1')
            return $sce.trustAsHtml("<FONT COLOR=green><b>อนุมัติและได้รับสารเคมี</b></FONT>");
       else if(input == '2')
            return $sce.trustAsHtml("<FONT COLOR=red><b>ไม่อนุมัติ</b></FONT>");
       else if(input == '3')
            return $sce.trustAsHtml("<FONT COLOR=green><b>อนุมัติและยังไม่ได้รับสารเคมี</</b></FONT>");
       else if(input == '4')
            return $sce.trustAsHtml("<FONT COLOR=green><b>ยังไม่ได้รับสารเคมี</</b></FONT>");
   }
})

