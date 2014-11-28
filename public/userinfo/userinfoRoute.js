/**
 * Created by liuhanxu on 14-11-28.
 */

'use strict';

// Declare app level module which depends on filters, and services
//'myApp.filters', 'myApp.services', 'myApp.directives'
angular.module('myApp', ['ngRoute']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        alert(2);
        $routeProvider.
            when('/testIndex', {
                templateUrl: '/recipe/test',
                controller: TestCtrl
            }).
            when('/recipe/index', {
                templateUrl: '/recipe/index',
                controller: AddPostCtrl
            }).
            otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    }]);

angular.module('nourtiture', ['ngRoute','angularFileUpload']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/index', {
                templateUrl: '/indexPart',
                controller: IndexPage
            }).
            when('/userinfo/show', {
                templateUrl: '/recipe/create',
                controller: ToCreateRecipe
            }).
            otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    }]);