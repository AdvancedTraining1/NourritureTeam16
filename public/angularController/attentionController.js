/**
 * Created by zhaiyuan on 12/6/14.
 */

'use strict';


function ToListFriendStatusRecipe($scope, $http, $location){
    $scope.recipes = {};
    $scope.pageing={
        pageNo : 1,
        itemsCount : 3,
        pageSize :1
    };

    $(function(){
        paging();
    });

    $scope.list = function () {
        paging();
    };

    function paging(){
        var api = "/service/attention/lookFriendStatusRecipe";
        $http({
            method: 'GET',
            url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize
        }).success(function(data, status) {
            $scope.recipes = data.root;console.log("root=="+data.root);
            $scope.pageing.itemsCount = data.total;console.log("total=="+data.total);
        }).error(function(data, status) {

        });
    }
}



function ToListAllAttention($scope,$routeParams, $http, $location){
    //$scope.search = $routeParams.search;
    //alert($routeParams.search);
    $scope.users = {};
    $scope.pageing={
        pageNo : 1,  //页码
        itemsCount : 3,  //总共
        pageSize :2  //每页有几个
    };

    $(function(){
        paging();
    });

    $scope.list = function () { //下一页
        //paging();
        var api = "/service/attention/searchAll";
        $http({
            method: 'GET',
            url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize +'&queryStr=' + $routeParams.search
        }).success(function(data, status) {
            $scope.users = data.root;
            $scope.pageing.itemsCount = data.total;
        }).error(function(data, status) {

        });
    };

    function paging(){
        var api = "/service/attention/listAll";
        $http({
            method: 'GET',
            url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize
        }).success(function(data, status) {
            $scope.users = data.root;
            $scope.pageing.itemsCount = data.total;
        }).error(function(data, status) {

        });
    }
    $(function(){
        //alert($routeParams.search);
        var api = "/service/attention/searchAll";
        if($routeParams.search == ""){
            paging();
        }else{
            $http({
                method: 'GET',
                url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize +'&queryStr=' + $routeParams.search
            }).success(function(data, status) {
                $scope.users = data.root;
                $scope.pageing.itemsCount = data.total;
            }).error(function(data, status) {

            });
        }
    });
}





function ToAddAttention($scope,$routeParams, $http, $location){
    //$scope.search = $routeParams.friendId;
    alert("关注成功");
    $(function(){
        var api = "/service/attention/addAttentions";

            $http({
                method: 'GET',
                url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize +'&queryStr=' + $routeParams.search
            }).success(function(data, status) {
                $scope.users = data.root;
                $scope.pageing.itemsCount = data.total;
            }).error(function(data, status) {

            });

    });
}
