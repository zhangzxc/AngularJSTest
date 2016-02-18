'use strict';

angular.module('myApp.view3', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl', function ($scope, $timeout, $interval, $http) {
        $scope.pageClass = "view3";

        //$scope.isError = true;

        $scope.userInfo = {
            email: "6842942@qq.com", password: "a123456", remember: true
        };

        $scope.getUserInfo = function () {
            console.log($scope.userInfo);
        };

        $scope.getUser = function () {
            console.log("$scope.userInfo");
        };

        $scope.setColor = function () {
            $scope.color = "blue";
        };

        $scope.save = function () {
            alert("保存数据");
        }
    })

    //这里的contenteditable名字是固定的 不能改 改了就没效果了 坑啊
    .directive('contenteditable', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {

                element.bind('keyup', function() {//绑定事件
                     //console.log('keyup');
                    scope.$apply(function () {
                        ctrl.$setViewValue(element.text());
                    });
                });

                //element.bind('click',function(){
                //    ctrl.$setViewValue("elementggg");
                //    console.log(ctrl.$viewValue + 'llll');
                //});

                ctrl.$render = function () {
                    element.html(ctrl.$viewValue);
                };

                ctrl.$setViewValue(element.html());
            }
        };
    })


;