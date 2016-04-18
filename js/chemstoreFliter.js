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

    .filter('confirmFilter', function() {
   return function(input) {
     return input == '0' ? "<FONT COLOR=red>รอการยืนยัน</FONT>" : "<FONT COLOR=green>ยืนยันเรียบร้อย</FONT>";
   }
})
