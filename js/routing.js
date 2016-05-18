//  route  ============================================================================================================
    chemstore.config(['$routeProvider',
	function($routeProvider) {
      $routeProvider
          .when(
            '/news',{
                templateUrl: '../html/news.html',
                controller: 'loginCtrl'
          }
          ).when(
            '/contact',{
                templateUrl: '../html/contact.html'
          }
          ).when(
            '/manageRequestChem',{
                templateUrl: '../html/manageRequestChem.html', 
                controller:  'submitRequestCtrl'
          }
          ).when(
            '/inboundChem',{
                templateUrl: '../html/inboundChem.html',
                controller:  'inboundChemCtrl'

            }
          ).when(
            '/viewReciept',{
                templateUrl: '../html/viewReciept.html',
                controller: 'recieptCtrl'
            }
          ).when(
            '/sold',{
                templateUrl: '../html/sold.html',
                controller: 'soldCtrl'
            }
          ).when(
            '/viewProject',{
                templateUrl: '../html/viewProject.html',
                controller: 'projectCtrl'
            } 
          ).when(
            '/editChem',{
                templateUrl: '../html/editChem.html',
                controller: 'editChemCtrl'
            } 
          ).when(
            '/importlog',{
                templateUrl: '../html/importlog.html',
                controller: 'importlogCtrl'
            }
          ).when(
            '/withdrawlog',{
                templateUrl: '../html/withdrawlog.html',
                controller: 'withdrawlogCtrl'
           } 
          ).when(
            '/salelog',{
                templateUrl: '../html/salelog.html',
                controller: 'salelogCtrl'
            }  
          ).when(
            '/viewStock',{
                templateUrl: '../html/viewStock.html',
                controller: 'categoryCtrl'
            }  
          ).when(
            '/addMember',{
                templateUrl: '../html/addMember.html',
                controller: 'membersCtrl'
            }  
          ).when(
            '/editMember',{
                templateUrl: '../html/editMember.html',
                controller: 'editmembersCtrl'
            }  
          ).when(
            '/addProject',{
                templateUrl: '../html/addProject.html',
                controller: 'addProjectCtrl'
            } 
           ).when(
            '/login',{
                templateUrl: '../html/login.html',
                controller: 'loginCtrl'
            }   
          ).when(
            '/statusRequestChem',{
                templateUrl: '../html/statusRequestChem.html',
                controller: 'teacherRequestCtrl'
            }   
          ).when(
            '/requestOther',{
                templateUrl: '../html/requestOther.html',
                controller: 'requestOtherCtrl'
            }   
          ).when(
            '/manageRequestOther',{
                templateUrl: '../html/manageRequestOther.html',
                controller: 'manageRequestOtherCtrl'
            }   
          ).when(
            '/addNews',{
                templateUrl: '../html/addNews.html',
                controller: 'addNewsCtrl'
            }   
          ).when(
            '/exchangeCatagory',{
                templateUrl: '../html/exchangeCatagory.html',
                controller: 'exchangeCtrl'
            }   
          ).when(
            '/manageLendChem',{
                templateUrl: '../html/manageLendChem.html',
                controller: 'submitRequestCtrl'
            }   
          ).otherwise({
                redirectTo: '/news'
      	  }); 
}]);
