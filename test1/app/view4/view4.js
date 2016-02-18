'use strict';

angular.module('myApp.view4', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view4', {
            templateUrl: 'view4/view4.html',
            controller: 'View4Ctrl'
        });
    }])

    .controller('View4Ctrl', function ($scope, $timeout, $interval, $http) {

        //定义个函数方法
        $scope.loadData = function () {
            console.log("loading.......");
        };

        $scope.loadDataByid = function () {
            console.log("loadDataByid");
        };


    })


    //自定义指令开始
    .directive('hello', function () {
        return {
            restrict: 'AEMC',
            template: '<div>Hi what\'s up1</div>',
            replace: true
        }
    })

    .directive('hellourl', function () {
        return {
            templateUrl: 'view4/hello.html', //这里的路径是从index.htm开始计算的 所以要注意路径起始
            replace: true //注意这里的replace 替换原来的元素  这样要当心 比如说之前是‘<div></div>’的话 引用进来的文本要注意div的嵌套，不然可能出不来
        }
    })

    .directive('hellocacheurl', function () {
        return {
            templateUrl: $templateCache.get("view4/hello.html"),
            replace: true //注意这里的replace 替换原来的元素  这样要当心 比如说之前是‘<div></div>’的话 引用进来的文本要注意div的嵌套，不然可能出不来
        }
    })

    //这个有点用 但还想不出哪里能用到 相当于在include的文件中加了个占位符
    .directive('hellotrans', function () {
        return {
            templateUrl: 'view4/hellotrans.html',
            transclude: true
        }
    })

    .directive('loader', function () {
        return {
            link: function (scope, element, attr) {
                element.bind('mouseenter', function (event) {
                    scope.loadData();
                    //scope.$apply("loadData()");
                    //scope.$apply("getUser()"); //跨controller调用方法 至少要在一个module中  这样看来 然并卵
                })
                var k = element.children('#myid');
                k.bind('mouseenter', function () {
                    scope.loadDataByid();
                })
            }
        }

    })


    //指令之间的互调
    .directive("superman", function () {
        return {
            scope: {}, //独立scope 创建独立作用域， 如果不加这句 下面的$scope.text 就像全局变量一样了， 如果我一直点按钮 text里的值会一直累加上去的
            controller: function ($scope) {
                //这里的controller不是MVC的controller 这里相关于定义一个类 类里的public方法
                $scope.text = [];
                this.addStrength = function () {
                    $scope.text.push("Strength");
                }
                this.addSpeed = function (value) {
                    $scope.text.push("Speed" + value);
                }
                this.addLight = function () {
                    $scope.text.push("Light");
                }
            },
            link: function (scope, element, attrs) {
                element.addClass("btn btn-primary");
                element.bind("click", function () {
                    console.log(scope.text);
                })
            }
        }
    })


    .directive("strength", function(){
        return{
            require:'^superman',
            link:function(scope,element,attr,supermanCtrl){
                supermanCtrl.addStrength();
            }
        }
    })

    .directive("speed", function(){
        return{
            require:'^superman',
            link:function(scope,element,attr,supermanCtrl){
                //console.log();
                supermanCtrl.addSpeed(attr.speed); //用attr可以获取“标签属性” 也就是当参数用，
            }
        }
    })

    .directive("light", function(){
        return{
            require:'^superman',
            link:function(scope,element,attr,supermanCtrl){
                supermanCtrl.addLight();
            }
        }
    })

    //指令之间的互调 END


    .run(function ($templateCache) {
        $templateCache.put("view4/hellocache.html", "<div>cache1</div>"); //现在大概看下 感觉这个cache有点鸡肋 只能保存字符串 不知道有什么用 先放着
    })


    //自定义指令结束


;