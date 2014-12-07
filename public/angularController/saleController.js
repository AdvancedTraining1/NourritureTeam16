/**
 * Created by zhangcan on 14-11-28.
 */

'use strict';

function CreateTradePost($scope, $http, $location){
    $scope.sale = {};

    $scope.publishTradePost = function () {

//        var postTitle = document.getElementById("title");
//        var postContent = document.getElementById("content");
//
//        $scope.sale.title = postTitle.value;
//        $scope.sale.content = postContent.value;

        $.post('/sale/create',$scope.sale,function(data){
            alert(data);
        });
    }
}