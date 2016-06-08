//  route  ============================================================================================================
    chemstore.config(['$routeProvider',
	function($routeProvider) {
      $routeProvider
          .when(
            '/news',{
                templateUrl: '../html/news.html',
                controller: 'newsCtrl'
          }
          ).when(
            '/logout',{
                templateUrl: '../html/logout.html',
                controller: 'logoutCtrl'
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
            '/manageInboundChem',{
                templateUrl: '../html/manageInboundChem.html',
                controller:  'inboundChemCtrl'

            }
          ).when(
            '/teacherAddReciept',{
                templateUrl: '../html/teacherAddReciept.html',
                controller: 'teacherAddReciept'
            }
          ).when(
            '/viewProject',{
                templateUrl: '../html/teacherViewProject.html',
                controller: 'viewProjectCtrl'
            } 
          ).when(
            '/manageEditChem',{
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
                controller: 'teacherReceiptlogCtrl'
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
                templateUrl: '../html/manageAddMember.html',
                controller: 'addMembersCtrl'
            }  
          ).when(
            '/editMember',{
                templateUrl: '../html/editMember.html',
                controller: 'editMembersCtrl'
            }  
          ).when(
            '/addProject',{
                templateUrl: '../html/teacherAddProject.html',
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
                templateUrl: '../html/manageAddNews.html',
                controller: 'addNewsCtrl'
            }   
          ).when(
            '/seniorExchangeCatagory',{
                templateUrl: '../html/seniorExchangeCatagory.html',
                controller: 'seniorExchangeCtrl'
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
            '/viewChemRanking',{
                templateUrl: '../html/viewChemRanking.html',
                controller: 'viewChemRankingCtrl'
            }   
          ).when(
            '/seniorExchangeStatus',{
                templateUrl: '../html/seniorExchangeStatus.html',
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
                controller: 'allOtherlogCtrl'
            }   
          ).when(
            '/seniorOtherlog',{
                templateUrl: '../html/logOther.html',
                controller: 'allOtherlogCtrl'
            }   
          ).when(
            '/seniorExchangeLog',{
                templateUrl: '../html/logExchang.html',
                controller: 'seniorExchangeLogCtrl'
            }   
          ).when(
            '/ExchangeLog',{
                templateUrl: '../html/logExchang.html',
                controller: 'ExchangeLogCtrl'
            }   
          ).when(
            '/manageEditAcoount',{
                templateUrl: '../html/manageEditAcoount.html',
                controller: 'manageEditAcoountCtrl'
            }   
          ).when(
            '/seniorSubmitRequest',{
                templateUrl: '../html/seniorSubmitRequest.html',
                controller: 'seniorSubmitRequestCtrl'
            }   
          ).when(
            '/seniorSubmitExchange',{
                templateUrl: '../html/seniorSubmitExchange.html',
                controller: 'seniorSubmitExchangetCtrl'
            }   
          ).when(
            '/seniorAddRequest',{
                templateUrl: '../html/seniorAddReciept.html',
                controller: 'seniorAddRequestCtrl'
            }   
          ).when(
            '/seniorAddRequestsStatus',{
                templateUrl: '../html/seniorAddStatus.html',
                controller: 'seniorAddRequestsStatusCtrl'
            }   
          )
          .when(
            '/seniorlogRec',{
                templateUrl: '../html/logRecieptEx.html',
                controller: 'seniorReceiptlogCtrl'
            }   
          )
          .otherwise({
                redirectTo: '/news'
      	  })  
}]);
