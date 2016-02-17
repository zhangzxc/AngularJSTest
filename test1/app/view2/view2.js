'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', function($scope, $timeout, $interval, $http) {
  $scope.myHeader = "Hi";
  $timeout(function () {
    $scope.myHeader = "How are you today?";
  }, 3000);


  $scope.theTime = new Date();
  $interval(function () {
    $scope.theTime = new Date();
    //$scope.theTime = new Date().toLocaleTimeString();
  }, 1000);



  var tmp3Url = "http://www.chinamerger.com/webapp/seeNewsList.action?limit=10&start=0&page=1&industryid=&searchstr=&user=&sprad=";
  var p = $http({
    method: 'JSONP',
    url: tmp3Url,
    params: {callback: 'JSON_CALLBACK'}
  });
  p.success(function(response, status, headers, config){
    $scope.myjsonp2 = response;
    //alert("ddd");
    //console.log(response);
    //$scope.name = response.name;
  })
  p.error(function(){alert("err");})
  ;

  $scope.myVar = false;
  $scope.toggle = function(){
    $scope.myVar = !$scope.myVar;
  }

  $scope.see = function(){
    console.log($scope.test_form.$error);
  }

  //$scope.$watch('passw1',function() {$scope.test();}); 监控某个值


});