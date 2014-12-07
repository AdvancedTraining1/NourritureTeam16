/**
 * Created by cmm on 11/25/14.
 */

'use strict';

function IndexPage($scope, $http, $location){
    //$location.path('/index');
}

function ToCreateRecipe($scope, $http, $location, $upload) {
    $scope.recipe = {};
    $scope.step = [];
    $scope.photoSee = false;
    $scope.stepSee = false;
    $scope.moreSteps = [{step:1}];
    $scope.moreMaterials = [{material:1}];

    $scope.onFileSelect = function ($files) {
        if($files != null){
            $scope.upload = $upload.upload({
                url: '/service/recipe/upload', //upload.php script, node.js route, or servlet url
                //method: 'POST' or 'PUT',
                //headers: {'header-key': 'header-value'},
                //withCredentials: true,
                file: $files // or list of files ($files) for html5 only
                //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
                // customize file formData name ('Content-Disposition'), server side file variable name.
                //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
                // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
                //formDataAppender: function(formData, key, val){}
            }).progress(function (evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function (data, status, headers, config) {        // file is uploaded successfully
                console.log(data);
                alert("Step image upload success!");
                //$scope.successMessage="Image upload success!";
                $scope.step.push(data);
                $scope.stepSee = true;
            });
        }
    };

    $scope.onFileSelect1 = function ($files) {
        if($files != null){
            $scope.upload = $upload.upload({
                url: '/service/recipe/upload',
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
    };

    $scope.moreMaterial = function () {
        $scope.moreMaterials.push({material:1});
    };

    $scope.lessMaterial = function () {
        if($scope.moreMaterials.length == 1){
            alert("More than one material!");
        }else{
            $scope.moreMaterials.pop();
        }
    };

    $scope.moreStep = function () {
        $scope.moreSteps.push({step:1});
    };

    $scope.lessStep = function () {
        if($scope.moreSteps.length == 1){
            alert("More than one step!");
        }else{
            $scope.moreSteps.pop();
            $scope.step.pop();
        }
    };

    $scope.createRecipePage = function () {
        $scope.recipe.material = [];
        $scope.recipe.step = [];
        var m_name = document.getElementsByName("materialName");
        var m_amount = document.getElementsByName("amount");
        var s_explain = document.getElementsByName("stepExplain");

        for (var i = 0, j = m_name.length; i < j; i++) {
            $scope.recipe.material.push({materialName:m_name[i].value,amount:m_amount[i].value});
        }
        for (var i = 0, j = s_explain.length; i < j; i++) {
            $scope.recipe.step.push({stepExplain:s_explain[i].value,stepPhoto:$scope.step[i]});
        }
        $scope.recipe.mNum = m_name.length
        $scope.recipe.sNum = s_explain.length;
        /*alert($scope.recipe.toString());
         alert(JSON.stringify($scope.recipe));*/
        $scope.recipe.authorId = 11;

        $.post('/service/recipe/create',$scope.recipe,function(data){
            alert(data);
        });
        /*$http.post('service/recipe/create', $scope.recipe).
         success(function(data) {
         alert(11);
         });*/
    };
}

function ToListRecipe($scope, $http, $location){
    $scope.recipes = {};
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
        var api = "/service/recipe/listAll";
        $http({
            method: 'GET',
            url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize
        }).success(function(data, status) {
            $scope.recipes = data.root;
            $scope.pageing.itemsCount = data.total;
        }).error(function(data, status) {

        });
    }

    $scope.searchRecipe = function(){
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
}

function ToSingleRecipe($scope, $routeParams,$http, $location){
    $scope.id = $routeParams.recipeId;
    $scope.noComment = true;
    $scope.comments = {};
    $scope.comment = {};
    $scope.commentPaging={
        pageNo : 1,
        itemsCount : 10,
        pageSize :10
    };

    $(function(){
        var recipeApi = "/service/recipe/showOne";
        $http({
            method: 'GET',
            url: recipeApi + '/'+$scope.id
        }).success(function(data, status) {
            $scope.recipe = data;
        }).error(function(data, status) {

        });

        commentPage();
    });

    $scope.list = function () {
        commentPage();
    };

    function commentPage(){
        var commentApi = "/service/recipe/listComment";
        $http({
            method: 'GET',
            url: commentApi + '?pageNo=' + $scope.commentPaging.pageNo + '&pageSize='+$scope.commentPaging.pageSize + '&recipeId='+$scope.id
        }).success(function(data, status) {
            $scope.commentPaging.itemsCount = data.total;
            $scope.comments = data.root;
            if(data.total != 0){
                $scope.noComment = false;
            }
        }).error(function(data, status) {

        });
    }

    $scope.addComment = function(replyUserId){
        var api = "/service/recipe/comment";
        $scope.comment.authorId = 11;
        $scope.comment.replyId = $scope.id;
        $scope.comment.replyUserId = replyUserId;

        $.post(api,$scope.comment,function(data){
            alert(data);
            commentPage();
            $scope.comment.content = null;
        });
        /*$http({
            method: 'POST',
            url: api + '/'+$scope.id
        }).success(function(data, status) {
            $scope.recipe = data;
        }).error(function(data, status) {

        });*/

    };
    // kuai su ding wei
    /*var old = $location.hash();
     $location.hash('batchmenu-bottom');
     $anchorScroll();
     $location.hash(old);*/
}

