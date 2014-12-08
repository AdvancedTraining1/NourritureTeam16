/**
 * Created by zhaiyuan on 12/6/14.
 */

'use strict';


function ToListFriendStatus($scope, $http, $location){
    /*$scope.search = $routeParams.search;
    alert(1);
    $scope.recipes = {};
    $scope.pageing={
        pageNo : 1,
        itemsCount : 3,
        pageSize :5
    };

    $(function(){
        paging();
    });

    $scope.list = function () {
        paging();
    };

    function paging(){
        var api = "/service/recipe/listAll";
        $http({
            method: 'GET',
            url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize
        }).success(function(data, status) {
            $scope.recipes = data.root;
        }).error(function(data, status) {

        });
    }

    $(function(){
        alert($scope.search);
        var api = "/service/attention/searchAll";
        if($scope.search == ""){
            var api = "/service/attention/listAll";
            $http({
                method: 'GET',
                url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize
            }).success(function(data, status) {
                $scope.users = data.root;
                $scope.pageing.itemsCount = data.total;
            }).error(function(data, status) {

            });
        }else{
            $http({
                method: 'GET',
                url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize +'&queryStr=' + $scope.search
            }).success(function(data, status) {
                $scope.users = data.root;
                $scope.pageing.itemsCount = data.total;
            }).error(function(data, status) {

            });
        }
    });*/
}



function ToListAllAttention($scope,$routeParams, $http, $location){
    $scope.search = $routeParams.search;
    $scope.users = {};
    $scope.pageing={
        pageNo : 1,
        itemsCount : 3,
        pageSize :5
    };

    /*$(function(){
        paging();
    });

    $scope.users = function () {
        paging();
    };

    function paging(){
        var api = "/service/recipe/listAll";
        $http({
            method: 'GET',
            url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize
        }).success(function(data, status) {
            $scope.recipes = data.root;
        }).error(function(data, status) {

        });
    }
*/
    $(function(){
        alert($scope.search);
        var api = "/service/attention/searchAll";
        if($scope.search == ""){
            var api = "/service/attention/listAll";
            $http({
                method: 'GET',
                url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize
            }).success(function(data, status) {
                $scope.users = data.root;
                $scope.pageing.itemsCount = data.total;
            }).error(function(data, status) {

            });
        }else{
            $http({
                method: 'GET',
                url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize +'&queryStr=' + $scope.search
            }).success(function(data, status) {
                $scope.users = data.root;
                $scope.pageing.itemsCount = data.total;
            }).error(function(data, status) {

            });
        }
    });
}
