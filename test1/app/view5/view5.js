'use strict';

angular.module('myApp.view5', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view5', {
            templateUrl: 'view5/view5.html',
            controller: 'View5Ctrl'
        });
    }])

    .controller('View5Ctrl', function ($scope, $timeout, $interval, $http) {
        $scope.title = '标题';
        $scope.text = '展开内容';

    })


    .directive('myexpand', function () {
        return {
            replace: true,
            transclude: true,
            templateUrl: 'view5/myexpand.html',
            link: function (scope, element, attrs) {
                scope.isexpand = false;
                scope.toggle = function () {
                    scope.isexpand = !scope.isexpand;
                }
            }
        }

    })


;