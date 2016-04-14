//  route  ============================================================================================================
    chemstore.config(['$routeProvider',
	function($routeProvider) {
      $routeProvider
          .when(
            '/',{
                templateUrl: '../html/news.html',
                controller: 'loginController'
          }
          ).when(
            '/contact',{
                templateUrl: '../html/contact.html'
          }
          ).when(
            '/requestChem',{
                templateUrl: '../html/requestChem.html', 
                controller:  'submitRequestController'
          }
          ).when(
            '/inboundChem',{
                templateUrl: '../html/inboundChem.html',
                controller:  'inboundChemController'

            }
          ).when(
            '/viewReciept',{
                templateUrl: '../html/viewReciept.html',
                controller: 'recieptController'
            }
          ).when(
            '/sold',{
                templateUrl: '../html/sold.html',
                controller: 'soldController'
            }
          ).when(
            '/viewProject',{
                templateUrl: '../html/viewProject.html',
                controller: 'projectController'
            } 
          ).when(
            '/transfer',{
                templateUrl: '../html/transfer.html',
                controller: 'transferChemController'
            } 
          ).when(
            '/editChem',{
                templateUrl: '../html/editChem.html',
                controller: 'editChemController'
            } 
          ).when(
            '/importlog',{
                templateUrl: '../html/importlog.html',
                controller: 'importlogController'
            }
          ).when(
            '/withdrawlog',{
                templateUrl: '../html/withdrawlog.html',
                controller: 'withdrawlogController'
           } 
          ).when(
            '/salelog',{
                templateUrl: '../html/salelog.html',
                controller: 'salelogController'
            }  
          ).when(
            '/viewStock',{
                templateUrl: '../html/viewStock.html',
                controller: 'categoryController'
            }  
          ).when(
            '/addMember',{
                templateUrl: '../html/addMember.html',
                controller: 'membersController'
            }  
          ).when(
            '/editMember',{
                templateUrl: '../html/editMember.html',
                controller: 'editmembersCtrl'
            }  
          ).when(
            '/addProject',{
                templateUrl: '../html/addProject.html',
                controller: 'projectController'
            } 
           ).when(
            '/login',{
                templateUrl: 'login.html',
                controller: 'loginController'
            }   
          ).otherwise({
                redirectTo: '/'
      	  }); 
}]);
