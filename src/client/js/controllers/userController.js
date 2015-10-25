app.controller("userController", function($scope, $stateParams, $http, api, Facebook){
	var userRef = {};
	console.log($stateParams.user);

	$scope.user = $stateParams.user;

	$scope.loading = {};
	$scope.loading.status = true;
	$scope.loading.text = "Loading...";

	api.getMap($scope.user, true).then(function(map){
		var initGraph = function(){
			var graph = new Graph($scope.user);
			graph.pruneAPIData(map, function(){
				console.log("DONE");
				$scope.loading.status = false;
				$("#loading").remove();
				graph.init({element: "#graph"});
			});
		};

		map = map.plain();

		if(!map){
			return $scope.loading.text = "No Data Found";
		}

		if(Object.keys(map).length < 1){
			initGraph();
		}
		

		var numFields = Object.keys(map).length;
		var done = 0;

		for(var id in map) {
			(function(id) {
			    api.getUserFromId(id, false, function(user) {
					userRef[id] = user.plain();
					map[id].name = userRef[id].userName;
					Facebook.api('/' + userRef[id].userName + '/picture?width=200&height=200', function(response) {
					  if(response && response.error){
					  	console.log("error", response.error);
					  }
					  else if(response && response.data && response.data.url){
					  	map[id].avatar = response.data.url;
					  }

					  if(++done === numFields){
					  	initGraph();
					  }
					});

					
				});
		    })(id);			
		}

		$scope.userRef = userRef;

	});

});
