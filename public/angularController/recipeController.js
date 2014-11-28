/**
 * Created by cmm on 11/25/14.
 */

'use strict';

function IndexPage($scope, $http, $location){
    //$location.path('/index');
}

function ToCreateRecipe($scope, $http, $location, $upload) {
    $scope.message = "Create a recipe!";
    $scope.step = [];

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
                $scope.succ="image upload success!";
                $scope.step.push(data);
            });
        }
    };

    $scope.moreMaterial = function (index) {
        $("#materialTable").append("<tr><td>Material Name</td><td><input type=\"text\" name=\"materialName\"></td><td>Material Amount</td><td><input type=\"text\" name=\"amount\"></td></tr>");
    };

    $scope.lessMaterial = function () {
        if($("#materialTable").find("tr").length == 1)
            alert("More than one material !");
        else
            $("#materialTable tr:last").remove();
    };

    $scope.moreStep = function () {
        $("#stepTable").append("<tr><td>Material Name</td><td><input type=\"text\" name=\"materialName\"></td><td>Material Amount</td><td><input type=\"text\" name=\"amount\"></td></tr>");
    };

    $scope.lessStep = function () {
        if($("#stepTable").find("tr").length == 1)
            alert("More than one step !");
        else
            $("#stepTable tr:last").remove();
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