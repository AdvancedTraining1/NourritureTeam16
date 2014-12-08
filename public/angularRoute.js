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
            when('/recipe/single/:recipeId', {
                templateUrl: '/recipe/single',
                controller: ToSingleRecipe
            }).
            when('/recipe/otherAll/:authorId', {
                templateUrl: '/recipe/otherAll',
                controller: ToOtherRecipe
            }).
            when('/recipe/ownAll/:authorId', {
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
            when('/attention/friendStatusList',{
                templateUrl:'/attention/friendStatusList', //routes
                controller:ToListFriendStatus
            }).
            when('/attention/getAllAttention',{
                templateUrl:'/attention/getAllAttention', //routes
                controller:ToListAllAttention
            }).
            otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    }]);

