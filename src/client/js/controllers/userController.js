app.controller("userController", function($scope, $stateParams, $http, api){
	var userRef = {};
	console.log($stateParams.user);

	$scope.user = $stateParams.user;

	$scope.loading = true;

	api.getMap($scope.user, true).then(function(map){
		map = map.plain();
		for(var id in map) {
			(function(id) {
			    api.getUserFromId(id, false, function(user) {
					userRef[id] = user.plain();
				});
		    })(id);			
		}
		$scope.userRef = userRef;
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

		$scope.loading = false;
	});

});
