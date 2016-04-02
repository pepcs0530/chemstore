'use strict';
angular.module('chemstore', ['ngRoute','ngResource'] ).config(['$routeProvider',
	function($routeProvider) {
      $routeProvider
          .when(
            '/requestChem',{
                templateUrl: 'requestChem.html', 
                controller:  'submitRequestController'
          }
          ).when(
            '/inboundChem',{
                templateUrl: 'inboundChem.html',
                controller:  'inboundChemController'

            }
          ).when(
            '/viewReciept',{
                templateUrl: 'viewReciept.html',
                controller: 'recieptController'
            }
          ).when(
            '/sold',{
                templateUrl: 'sold.html',
                controller: 'soldController'
            }
          ).when(
            '/viewProject',{
                templateUrl: 'viewProject.html',
                controller: 'projectController'
            } 
          ).when(
            '/transfer',{
                templateUrl: 'transfer.html',
                controller: 'transferController'
            } 
          ).when(
            '/adjust',{
                templateUrl: 'adjust.html',
                controller: 'adjustController'
            } 
          ).when(
            '/importlog',{
                templateUrl: 'importlog.html',
                controller: 'importlogController'
            }
          ).when(
            '/withdrawlog',{
                templateUrl: 'withdrawlog.html',
                controller: 'withdrawlogController'
           } 
          ).when(
            '/salelog',{
                templateUrl: 'salelog.html',
                controller: 'salelogController'
            }  
          ).when(
            '/viewStock',{
                templateUrl: 'viewStock.html',
                controller: 'namesCtrl'
            }  
          ).when(
            '/addMember',{
                templateUrl: 'addMember.html',
                controller: 'membersController'
            }  
          ).when(
            '/editMember',{
                templateUrl: 'editMember.html',
                controller: 'editmembersCtrl'
            }  
          ).when(
            '/addProject',{
                templateUrl: 'addProject.html',
                controller: 'projectController'
            }  
          ).otherwise({
              redirectTo: '/requestChem'
      	  });
      	  
}]);
