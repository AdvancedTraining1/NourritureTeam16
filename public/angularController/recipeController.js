/**
 * Created by cmm on 11/25/14.
 */

'use strict';

function IndexPage($scope, $http, $location){
    //$location.path('/index');
}

function ToCreateRecipe($scope, $http, $location, $upload) {
    //, $upload, $fileUpload
    alert(0);
    $scope.message = "Create a recipe!";
    $scope.form = {};

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
                //$location.path('/recipe/create');
            });
        }
    };

    $scope.createRecipe = function () {
        //$http.post('/api/post', $scope.form).
        //    success(function(data) {
        //        $location.path('/');
        //    });
        alert("post" + $scope.form.title + ',' + $scope.form.text);
        $location.path('/recipe/create');
    };

    $scope.ff = function () {
        var els =document.getElementsByName("m");
        for (var i = 0, j = els.length; i < j; i++){
            alert(els[i].value);
        }

        //alert("post" + $scope.form.title + ',' + $scope.form.text);
        //$location.path('/recipe/create');
    };

    $scope.moreMaterial = function () {
        $("#materialTable").append("<tr><td>Material Name</td><td><input type=\"text\" name=\"materialName\"></td><td>Material Amount</td><td><input type=\"text\" name=\"amount\"></td></tr>");
    };

    $scope.lessMaterial = function () {
        if($("#materialTable").find(tr).length == 1)
            alert("More than one material !");
        else
            $("#materialTable tr:last").remove();
    };

    $scope.moreMaterial = function () {
        $("#materialTable").append("<tr><td>Material Name</td><td><input type=\"text\" name=\"materialName\"></td><td>Material Amount</td><td><input type=\"text\" name=\"amount\"></td></tr>");
    };

    $scope.lessMaterial = function () {
        if($("#stepTable").find("tr").length == 1)
            alert("More than one step !");
        else
            $("#stepTable tr:last").remove();
    };
}