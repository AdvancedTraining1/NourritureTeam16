/**
 * Created by cmm on 11/28/14.
 */

'use strict';

angular.module('nourtiture', ['ngRoute','angularFileUpload']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/index', {
                templateUrl: '/indexPart'
		        //,controller: IndexPage
            }).
            when('/recipe/create', {
                templateUrl: '/recipe/create',
                controller: ToCreateRecipe
            }).
            otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    }]);
