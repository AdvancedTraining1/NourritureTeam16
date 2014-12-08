/**
 * Created by cmm on 11/28/14.
 */

'use strict';

angular.module('nourriture', ['ngRoute','angularFileUpload']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/index', {
                templateUrl: '/indexPart',
		        controller: IndexPage
            }).
            when('/recipe/create_an', {
                templateUrl: '/recipe/create',
                controller: ToCreateRecipe
            }).
            when('/recipe/list_an', {
                templateUrl: '/recipe/list',
                controller: ToListRecipe
            }).
            when('/recipe/single_an/:recipeId', {
                templateUrl: '/recipe/single',
                controller: ToSingleRecipe
            }).
            when('/recipe/otherAll_an/:authorId', {
                templateUrl: '/recipe/otherAll',
                controller: ToOtherRecipe
            }).
            when('/recipe/ownAll_an/:authorId', {
                templateUrl: '/recipe/ownAll',
                controller: ToOwnRecipe
            }).
            when('/userinfo/show123',{
                templateUrl:'/userinfo/show',
                controller:showuser
            }).
            when('/sale/createTradePost',{
                templateUrl:'/sale/createTradePost',
                controller:CreateTradePost
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

