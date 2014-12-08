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
        $scope.blog.tags=$scope.blogtag;

        alert($scope.blog.content);

        $.post('/blog/publishBlog',$scope.blog,function(data){
            alert(data);
        });

    }
}

function ToListBlog($scope, $http, $location){
    $scope.blogs = {};
    $scope.collect = {};
    $scope.pageing={
        pageNo : 1,
        itemsCount : 10,
        pageSize :5
    };

    $(function(){
        pageing();
    });

    $scope.list = function () {
        pageing();
    };

    function pageing(){
        var api = "/blog/showBlogList";
        $http({
            method: 'GET',
            url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize
        }).success(function(data, status) {
            $scope.blogs = data.root;
            $scope.pageing.itemsCount = data.total;
        }).error(function(data, status) {

        });
    }

   /* $scope.searchRecipe = function(){
        var api = "/service/recipe/search";
        if($scope.search == ""){
            pageing();
        }else{
            $http({
                method: 'GET',
                url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize +'&queryStr=' + $scope.search
            }).success(function(data, status) {
                $scope.recipes = data.root;
                $scope.pageing.itemsCount = data.total;
            }).error(function(data, status) {

            });
        }
    };

    $scope.addCollect = function(id){
        var api = "/service/recipe/collect";
        $scope.collect.userId = 11;
        $scope.collect.recipeId = id;

        var checkApi = '/service/recipe/checkCollect' + '?userId=' + $scope.collect.userId + '&recipeId='+$scope.collect.recipeId;

        $.get(checkApi,function(data){
            if(data == "false"){
                $.post(api,$scope.collect,function(data){
                    alert(data);
                    pageing();
                    $scope.recipe.collectNum += 1;
                });
            }else{
                alert("Already collected");
            }
        });
    };*/
}