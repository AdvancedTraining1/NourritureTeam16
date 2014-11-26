/**
 * Created by cmm on 11/25/14.
 */

'use strict';

/* Controllers */

function TestCtrl($scope, $http, $location) {
    $scope.message = "This is a test message";
    $scope.form = {};
    $scope.submitPost = function () {
        //$http.post('/api/post', $scope.form).
        //    success(function(data) {
        //        $location.path('/');
        //    });
        alert("post"+$scope.form.title+','+$scope.form.text);
        $location.path('/recipe/index');
    };
}

function AddPostCtrl($scope, $http) {
    $scope.message = "After post";
}