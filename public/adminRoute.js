/**
 * Created by hh on 11/28/14.
 */

'use strict';

angular.module('administrator', ['ngRoute','angularFileUpload']).
	config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider.
			when('/adminIndex', {
				templateUrl: '/adminIndexPart',
				controller: IndexPage
			}).
			when('/admin/addUser_an', {
				templateUrl: '/admin/addUser'
			}).
			when('/admin/getUser_an', {
				templateUrl: '/admin/getUser',
				controller: ToUser
			}).
			when('/admin/updateUser_an/:_account', {
				templateUrl: '/admin/updateUser',
				controller: UpdateUser
			}).
			otherwise({
				redirectTo: '/'
			});
		$locationProvider.html5Mode(true);
	}]);
