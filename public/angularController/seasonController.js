/**
 * Created by hh on 11/28/14.
 */

'use strict';
//angular.module('season',['ui.bootstrap']);
//angular.module('season').controller('you', function ($scope) {
//
//	alert(11111111111);
//	$scope.isCollapsed = false;
//});


//angular.module('ui.bootstrap.demo').controller('CollapseDemoCtrl', function ($scope) {
//	$scope.isCollapsed = false;
//});

//angular.module('myModule', ['ui.bootstrap.collapse']);

function Season($scope, $http, $location){
	$scope.season = {};
	$scope.seasons = {};

	$scope.is_visible = false;
	$scope.pageing={
		pageNo : 1,
		itemsCount : 10,
		pageSize :12
	};

	$scope.list = function () {
		pageing();
	};

	function pageing(){
		var api = "/season/listSeason";

		$http({
			method: 'GET',
			url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize
		}).success(function(data, status) {
			//alert(data);
			$scope.seasons = data.seasons;

			$scope.pageing.itemsCount = data.total;
			//alert(data.total);

			if(data.total == 0)
			{
				alert("Season food not exist");
			}else
			{
				$scope.is_visible = true;
				//alert($scope.is_visible);
			}

		}).error(function(data, status) {
			//alert("Data error");
		});

	}

	$(function(){
		pageing();
	});


}