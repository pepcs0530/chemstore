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
                controller:  'submitRequestChemCtrl'
          }
          ).when(
            '/inboundChem',{
                templateUrl: '../html/inboundChem.html',
                controller:  'inboundChemCtrl'

            }
          ).when(
            '/teacherAddReciept',{
                templateUrl: '../html/teacherAddReciept.html',
                controller: 'teacherAddReciept'
            }
          ).when(
            '/sold',{
                templateUrl: '../html/sold.html',
                controller: 'soldCtrl'
            }
          ).when(
            '/viewProject',{
                templateUrl: '../html/viewProject.html',
                controller: 'viewProjectCtrl'
            } 
          ).when(
            '/editChem',{
                templateUrl: '../html/editChem.html',
                controller: 'editChemCtrl'
            } 
          ).when(
            '/importlog',{
                templateUrl: '../html/logImport.html',
                controller: 'importlogCtrl'
            }
          ).when(
            '/receiptlog',{
                templateUrl: '../html/logReceipt.html',
                controller: 'receiptlogCtrl'
           } 
          ).when(
            '/teacherReceiptlog',{
                templateUrl: '../html/logReceipt.html',
                controller: 'teacherReceiptlog'
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
                controller: 'addMembersCtrl'
            }  
          ).when(
            '/editMember',{
                templateUrl: '../html/editMember.html',
                controller: 'editMembersCtrl'
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
            '/teacherRequestChem',{
                templateUrl: '../html/teacherRequestChem.html',
                controller: 'teacherRequestCtrl'
            }   
          ).when(
            '/addOtherCtrl',{
                templateUrl: '../html/requestOther.html',
                controller: 'addOtherCtrl'
            }   
          ).when(
            '/manageRequestOther',{
                templateUrl: '../html/manageRequestOther.html',
                controller: 'submitRequestOther'
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
            '/manageExchangeChem',{
                templateUrl: '../html/manageExchangeChem.html',
                controller: 'submitExchangeChemCtrl'
            }   
          ).when(
            '/viewBudget',{
                templateUrl: '../html/viewBudget.html',
                controller: 'viewBudgetCtrl'
            }   
          ).when(
            '/seniorExchangeStatusCtrl',{
                templateUrl: '../html/seniorExchangeStatusCtrl.html',
                controller: 'seniorExchangeStatusCtrl'
            }   
          ).when(
            '/viewRemainChem',{
                templateUrl: '../html/viewRemainChem.html',
                controller: 'viewRemainChemCtrl'
            }   
          ).when(
            '/otherlog',{
                templateUrl: '../html/logOther.html',
                controller: 'otherlogCtrl'
            }   
          ).when(
            '/teacherOtherlog',{
                templateUrl: '../html/logOther.html',
                controller: 'teacherOtherlogCtrl'
            }   
          ).otherwise({
                redirectTo: '/news'
      	  }); 
}]);
