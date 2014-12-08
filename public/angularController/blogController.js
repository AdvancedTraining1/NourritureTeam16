/**
 * Created by mengchi on 12/5/14.
 */
'use strict';

function ToCreateBlog($scope, $http) {

    $scope.createBlog = function () {
        $scope.blog={}

        alert($scope.blogtitle);
        var title =  $scope.blogtitle;
        var content=$('#editor').html();
        $scope.blog.title =title;
        $scope.blog.content = content;

        alert($scope.blog.content);

        $.post('/blog/publishBlog',$scope.blog,function(data){
            alert(data);
        });

    }
}