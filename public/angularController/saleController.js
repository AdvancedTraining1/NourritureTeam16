/**
 * Created by zhangcan on 14-11-28.
 */

'use strict';

function CreateTradePost($scope, $http, $location){
    $scope.sale = {};
    $scope.publishTradePost = function () {

        var postTitle = document.getElementsByName("title");
        var postContent = document.getElementsByName("content");

        $scope.sale.title = postTitle;
        $scope.sale.content = postContent;

        $.post('/sale/create',$scope.recipe,function(data){
            alert(data);
        });
    }
}