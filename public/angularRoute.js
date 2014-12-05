/**
 * Created by cmm on 11/28/14.
 */

'use strict';

angular.module('nourriture', ['ngRoute','angularFileUpload']).
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
            when('/recipe/list', {
                templateUrl: '/recipe/list',
                controller: ToListRecipe
            }).
            when('/userinfo/show123',{
                templateUrl:'/userinfo/show',
                controller:showuser
            }).
            when('/sale/createTradePost',{
                templateUrl:'/sale/createTradePost',
                controller:CreateTradePost
            }).
            otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    }]);

