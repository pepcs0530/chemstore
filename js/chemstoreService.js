//chemstore.service('fileUpload', ['$http', function ($http) {
//    alert("service");
//            this.uploadFileToUrl = function(file, uploadUrl){  alert("upload");
//               var fd = new FormData();
//               fd.append('file', file);
//            
//               $http.post(uploadUrl, fd, {
//                  transformRequest: angular.identity,
//                  headers: {'Content-Type': undefined}
//               })
//            
//               .success(function(){
//               })
//            
//               .error(function(){
//               });
//            }
//         }]);