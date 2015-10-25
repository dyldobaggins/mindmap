app.controller("userController", function($scope, $stateParams, api){

	console.log($stateParams.user);

	$scope.user = $stateParams.user;

	api.getMap($scope.user).then(function(map){
		console.log("map", map);

		var graph = new Graph();
		graph.init("#graph");
	});

});
