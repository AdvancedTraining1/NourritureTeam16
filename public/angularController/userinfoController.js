/**
 * Created by liuhanxu on 14-11-28.
 */

'use strict';

/* Controllers 主要用于夹在js对界面进行控制*/
function showuser($scope, $http, $location){

}
function RegisterAndLogin($scope, $http, $location, $upload) {
    $scope.userinfo = {};


    $scope.login= function () {
        $scope.userinfo.username = document.getElementById('username').value; //在dao层才去对比account
        $scope.userinfo.password = document.getElementById('password').value;

        $.post('/service/userinfo/login',$scope.userinfo,function(data){
            alert(data);
        });

        //var form=document.createElement("form");
        //form.action="/service/userinfo/login";
        //form.method="post";//指定为post
        //form.innerHTML="<input type='hidden' name='username' id='username' value='"+username+"'/>"+
        //"<input type='hidden' name='password' id='password' value='"+password+"'/>";
        //document.body.appendChild(form);
        //form.submit();
    }
    $scope.register= function () {
        alert("123");
        $scope.userinfo.username = document.getElementById('username2').value; //在dao层才去对比account
        $scope.userinfo.password = document.getElementById('password2').value;
        $scope.userinfo.email = document.getElementById('email2').value;
        $.post('/service/userinfo/register',$scope.userinfo,function(data){
            alert(data);
        });
    }
}