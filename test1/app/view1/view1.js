'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', [function () {


    }])


    .directive("runoobDirective", function () {
        return {
            restrict: 'e',
            template: "<h1>自定义指令!</h1>",
            replace: true
        };
    })


    .controller('personCtrl', function ($scope) {
        $scope.firstName = "uuuuuuu";
        $scope.lastName = "yyy";
        $scope.fullName = function () {
            return $scope.firstName + " " + $scope.lastName;
        }
    })

    .controller('View1Ctrl', function ($scope, $location, $http) {
        $scope.name = "zsl";
        $scope.lastname = "zddsl";
        $scope.myUrl = $location.absUrl();

        //$http.get("http://127.0.0.1:63342/test1/app/view1/tmp.html").then(function (response) {
        //    $scope.myWelcome = "response.data";
        //});

        var tmpUrl = "http://127.0.0.1:63342/test1/app/view1/tmp.html";
        $http.get(tmpUrl).then(function(response) {
            $scope.myData = response.data.records;
        });


        //一种JSONP是用回调方法实现的 要自己实现window.JSON_CALLBACK
        var tmp2Url = "http://127.0.0.1:63342/test1/app/view1/tmp2.html?callback=JSON_CALLBACK";
        $http.jsonp(tmp2Url);
        //$scope.myjsonp = $http.jsonp(tmp2Url);
        window.JSON_CALLBACK = function(data) {
            //$scope.events = data.events;
            //alert("data.events");
            $scope.myjsonp = data;
            //alert("data");
        }


        //另一种JSONP方法， JSONP文件中的callback必须要用request.getparm("callback")取到callback值再写到jsonp最前面
        var tmp3Url = "http://127.0.0.1:63342/test1/app/view1/tmp3.html";
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


/*        $http.jsonp(tmp2Url)
            .success(
                function (data) {
                    alert("data");
                }
            )
            .error(
                function () {
                    alert("error");
                }
            )
        ;*/

    });

//.controller('View1Ctrl', function ($scope, $http) {
//    //$http.get("http://localhost:63342/test1/app/view1/tmp.html").then(function (response) {
//    //    $scope.myWelcome = "response.data";
//    //});
//});





