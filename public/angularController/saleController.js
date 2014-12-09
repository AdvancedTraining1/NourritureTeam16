/**
 * Created by zhangcan on 14-11-28.
 */

'use strict';

function CreateTradePost($scope, $http, $location){
    $scope.sale = {};

    $scope.publishTradePost = function () {
        var content = $('#editor').html();
        $scope.sale.content = content;
        $.post('/sale/create',$scope.sale,function(data){
            alert(data);
            //$location.path('/sale/list');
        });
    }
}

function ListTradePost($scope, $http, $location){
    $scope.sales = {}
    $scope.collect = {};
    $scope.pageing={
        pageNo : 1,
        itemsCount : 10,
        pageSize : 5
    };

    $(function(){
        pageing();
    });

    $scope.list = function () {
        pageing();
    };

    function pageing(){
        var api = "/sale/listAll";
        $http({
            method: 'GET',
            url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize=' + $scope.pageing.pageSize
        }).success(function(data, status) {
            $scope.sales = data.root;
            $scope.pageing.itemsCount = data.total;
        }).error(function(data, status) {

        });
    }

    $scope.searchTradePost = function () {

    }
}