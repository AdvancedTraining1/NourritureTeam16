/**
 * Created by mengchi on 12/5/14.
 */
'use strict';

function ToCreateBlog($scope, $http) {

    $scope.createBlog = function () {

        alert($scope.blog.title);
        $.post('/blog/publishBlog', $scope.blog, function (data) {
            alert(data);
        });

    }


}

