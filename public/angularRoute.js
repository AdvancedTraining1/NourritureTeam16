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
            when('/recipe/single/:recipeId', {
                templateUrl: '/recipe/single',
                controller: ToSingleRecipe
            }).
            when('/userinfo/show',{
                templateUrl:'/userinfo/show',
                controller:showuser
            }).
            when('/userinfo/register',{    //这是index里面在ng-app中对应的urls
                templateUrl:'/service/userinfo/gotoRegister',  //去route里面找
                controller:RegisterAndLogin
            }).
            when('/userinfo/info',{    //这是index里面在ng-app中对应的urls
                templateUrl:'/service/userinfo/gotoInfo',  //去route里面找
                controller:showuser
            }).
            when('/sale/createTradePost',{
                templateUrl:'/sale/createTradePost',
                controller:CreateTradePost
            }).
            when('/sale/listTradePost',{
                templateUrl:'/sale/listTradePost',
                controller:ListTradePost
            }).
            when('/blog/createBlog',{
                templateUrl:'/blog/createBlog',
                controller:ToCreateBlog
            }).
            otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    }]);

