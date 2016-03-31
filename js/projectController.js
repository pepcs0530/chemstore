angular.module('chemstore', []).controller('projectController', function($scope,$http) {
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
});