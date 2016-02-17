'use strict';

angular.module('myApp.view3', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl', function ($scope, $timeout, $interval, $http) {
        $scope.pageClass="view3";

        //$scope.isError = true;

        $scope.userInfo = {
            email: "6842942@qq.com", password: "a123456", remember: true
        };

        $scope.getUserInfo = function () {
            console.log($scope.userInfo);
        };

        $scope.setColor = function () {
            $scope.color = "blue";
        };
    })
;