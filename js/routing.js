//  route  ============================================================================================================
    chemstore.config(['$routeProvider',
	function($routeProvider) {
      $routeProvider
          .when(
            '/',{
                templateUrl: '../html/news.html',
                controller: 'loginCtrl'
          }
          ).when(
            '/contact',{
                templateUrl: '../html/contact.html'
          }
          ).when(
            '/requestChem',{
                templateUrl: '../html/requestChem.html', 
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
            '/transfer',{
                templateUrl: '../html/transfer.html',
                controller: 'transferChemCtrl'
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
                templateUrl: 'login.html',
                controller: 'loginCtrl'
            }   
          ).otherwise({
                redirectTo: '/'
      	  }); 
}]);
