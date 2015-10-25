app.controller("userController", function($scope, $stateParams, api){

	console.log($stateParams.user);

	$scope.user = $stateParams.user;

	api.getMap($scope.user, true).then(function(map){
		map = map.plain();

		var graph_data = {
		"nodes":[
			{"name":"userOne"},
			{"name":"userTwo"},
			{"name":"userThree"},
			{"name":"userFour"}
		],
		"links":[
		    {"source":0,"target":1,"value":0.33},
		    {"source":0,"target":2,"value":0.99},
		    {"source":0,"target":3,"value":0.45}
		]
		};

		console.log("map", map);
		var graph = new Graph($scope.user);
		graph.pruneAPIData(map);
		graph.init({element: "#graph"});
	});

});
