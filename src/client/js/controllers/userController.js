app.controller("userController", function($scope, $stateParams){

	console.log($stateParams.user);

	$scope.user = $stateParams.user;

	$scope.collapsed = false;

	$scope.toggle = function(){
		$scope.collapsed = !$scope.collapsed;
	}

});
