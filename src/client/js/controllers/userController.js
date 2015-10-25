app.controller("userController", function($scope, $stateParams, api){

	console.log($stateParams.user);

	$scope.user = $stateParams.user;

	$scope.collapsed = false;

	$scope.toggle = function(){
		$scope.collapsed = !$scope.collapsed;
	}

	api.getMap($scope.user).then(function(map){
		console.log("map", map);

		var graph = new Graph();
		graph.init("#graph");
	});

});
