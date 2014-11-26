/**
 * Created by cmm on 11/25/14.
 */

'use strict';

// Declare app level module which depends on filters, and services
//'myApp.filters', 'myApp.services', 'myApp.directives'
angular.module('myApp', ['ngRoute']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        alert(2);
        $routeProvider.
            when('/index', {
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