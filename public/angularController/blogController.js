/**
 * Created by mengchi on 12/5/14.
 */
'use strict';

function ToCreateBlog($scope, $http) {

/*    $scope.onFileSelect = function ($files) {
        if($files != null){
            $scope.upload = $upload.upload({
                url: '/blog/upload',
                file: $files
            }).progress(function (evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function (data, status, headers, config) {        // file is uploaded successfully
                console.log(data);
                alert("Recipe image upload success!");
                //$scope.successMessage="Image upload success!";
                $scope.recipe.photo = data;
                $scope.photoSee = true;
            });
        }

        $('#editor').wysiwyg();

        var imgTag = $("#editor").find("img[src='" + dataUrl + "']");
        if (imgTag.length > 0) {
             // 图片存在, 上传当前文件.
             // uploadImage方法为你的上传图片方法.
             var url = uploadImage(fileObj);
                    imgTag.attr("src", url);


    };*/

    $scope.createBlog = function () {
        $scope.blog={}

        var title =  $scope.blogtitle;
        //var content=$('#editor').wysiwyg();
        var content=$('#editor').html();
        $scope.blog.title =title;
        $scope.blog.content = content;
        $scope.blog.tags=$scope.blogtag;
        alert($scope.blog.tags);

        $.post('/blog/publishBlog',$scope.blog,function(data){
            alert("a");
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

function BlogDetail($scope, $routeParams,$http, $location,$upload) {
    $scope.id = $routeParams.blog_id;

    console.log("id------",$scope.id);
    $scope.noComment = true;
    $scope.comments = {};
    $scope.comment = {};
    $scope.collect = {};
    $scope.blog = {};
    $scope.content = {};

    $scope.commentPaging = {
        pageNo: 1,
        itemsCount: 10,
        pageSize: 5
    };

    $(function () {
        $http({
            method: 'GET',
            url: "blog/showBlogDetail/" + $scope.id
        }).success(function (data, status) {
            $scope.blog = data.blog;
            document.getElementById("post_content").innerHTML = data.blog.content;

        }).error(function (data, status) {

        });

        commentPage();
    });

    $scope.list = function () {
        commentPage();
    };

    function commentPage() {
        var commentApi = "/blog/showCommentListToBlog";
        $http({
            method: 'GET',
            url: commentApi + '?pageNo=' + $scope.commentPaging.pageNo + '&pageSize=' + $scope.commentPaging.pageSize + '&blog_id=' + $scope.id
        }).success(function (data, status) {
            $scope.commentPaging.itemsCount = data.total;
            $scope.comments = data.root;
            if (data.total != 0) {
                $scope.noComment = false;
            }
        }).error(function (data, status) {

        });
    }

   /* $scope.addComment = function (replyUserId) {
        var api = "/service/recipe/comment";
        $scope.comment.authorId = 11;
        $scope.comment.replyId = $scope.id;
        $scope.comment.replyUserId = replyUserId;

        $.post(api, $scope.comment, function (data) {
            alert(data);
            commentPage();
            $scope.comment.content = null;
            $scope.recipe.commentNum += 1;
        });
    };*/


}
