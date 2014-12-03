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
			when('/admin/addUser', {
				templateUrl: '/admin/adduser'
			}).
			when('/admin/getUser', {
				templateUrl: '/admin/getUser',
				controller: ToGetUser
			}).
			otherwise({
				redirectTo: '/'
			});
		$locationProvider.html5Mode(true);
	}]);
