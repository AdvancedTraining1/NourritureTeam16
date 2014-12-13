/**
 * Created by cmm on 12/8/14.
 */
function IndexPage($scope, $routeParams ,$http, $location){

    $(function(){
        queryRecipe();
        qureyTopic();
        qureyBlog();
    });

    function queryRecipe(){
        var api = "/service/recipe/listAll";
        $http({
            method: 'GET',
            url: api + '?pageNo=1&pageSize=3'
        }).success(function(data, status) {
            $scope.recipes = data.root;
        });
    }


    function qureyTopic(){
        var api = "/topic/showTopicList";
        $http({
            method: 'GET',
            url: api + '?pageNo=1&pageSize=3'
        }).success(function(data, status) {
            $scope.topics = data.topics;

        });
    }

    function qureyBlog(){
        var api = "/blog/showBlogList";
        $http({
            method: 'GET',
            url: api + '?pageNo=1&pageSize=6'
        }).success(function(data, status) {
            $scope.blogs = data.root;

        }).error(function(data, status) {

        });
    }
}
